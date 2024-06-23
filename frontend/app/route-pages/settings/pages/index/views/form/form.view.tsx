import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import { FormBody } from './form-body/form-body.view'
import { FormFooter } from './form-footer/form-footer.view'
import { handleFormSubmit } from '~/common/utils/handle-form-submit.util'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormFeedback } from '~/common/hooks/use-form-feedback.hook'
import glpn from 'google-libphonenumber'
import { useEffect } from 'react'

const phoneUtil = glpn.PhoneNumberUtil.getInstance()

export const Form = () => {
  const { userJson } = useLoaderData() as any

  let defaultValues: any = {}

  if (userJson.user) {
    defaultValues = {
      name: userJson.user.name,
      email: userJson.user.email,
      location: userJson.user.settings.address,
      latitude: userJson.user.settings.latitude,
      longitude: userJson.user.settings.longitude,
      zodiacSign: userJson.user.settings.zodiacSign,
      timezone: userJson.user.timezone,
      phoneActive: userJson.user.phoneActive,
    }

    if (userJson.user.phone) {
      const phone = phoneUtil.parseAndKeepRawInput(userJson.user.phone)
      const countryCode = `+${phone.getCountryCode()}`
      const nationalNumber = phone.getNationalNumber()

      defaultValues.phoneCountryCode = countryCode
      defaultValues.phone = nationalNumber
    } else defaultValues.phoneCountryCode = '+'
  }

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(formValidation),
    defaultValues,
  })

  return (
    <FormProvider {...form}>
      <SettingsForm />
    </FormProvider>
  )
}

const SettingsForm = () => {
  const actionData = useActionData<ApiResponses.JsonResponse>()
  const formContext = useFormContext()
  const submit = useSubmit()

  const { codeVerified } = useLoaderData() as any
  const navigate = useNavigate()

  const METHOD = 'POST'

  useFormFeedback(actionData)

  useEffect(() => {
    if (codeVerified) {
      navigate({ search: '' }, { replace: true })

      handleFormSubmit({ formContext, submit, method: METHOD })
    }
  }, [codeVerified])

  return (
    <RemixForm
      method={METHOD}
      onSubmit={(event) => {
        handleFormSubmit({ event, formContext, submit, method: METHOD })
      }}
    >
      <FormBody />
      <FormFooter />
    </RemixForm>
  )
}

export const formValidation = zod.object({
  name: zod.string().min(1),
  email: zod.string().email(),
  timezone: zod.string().min(1),
})

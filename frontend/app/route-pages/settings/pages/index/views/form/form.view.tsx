import { Form as RemixForm, useActionData, useLoaderData, useSubmit } from '@remix-run/react'
import { FormBody } from './form-body/form-body.view'
import { FormFooter } from './form-footer/form-footer.view'
import { handleFormSubmit } from '~/common/utils/handle-form-submit.util'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormFeedback } from '~/common/hooks/use-form-feedback.hook'

export const Form = () => {
  const {  userJson } = useLoaderData() as any

  console.log('userJson', userJson)

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(formValidation),
    defaultValues: userJson?.user || {}
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

  const METHOD = 'POST'

  useFormFeedback(actionData)

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
  phone: zod.string().min(1),
  timezone: zod.string().min(1),
})

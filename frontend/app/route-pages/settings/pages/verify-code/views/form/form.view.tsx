import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, useFormControl } from '@mui/material'
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from '@remix-run/react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useFormFeedback } from '~/common/hooks/use-form-feedback.hook'
import { handleFormSubmit } from '~/common/utils/handle-form-submit.util'
import { TextField } from '~/components/text-field.view'
import { useEffect } from 'react'
import { LoadingButton } from '@mui/lab'

export const Form = () => {
  const { newPhone } = useLoaderData() as any

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(formValidation),
    defaultValues: { code: '', phone: newPhone },
  })

  return (
    <FormProvider {...form}>
      <FormContent />
    </FormProvider>
  )
}

const FormContent = () => {
  const actionData = useActionData<ApiResponses.JsonResponse>()
  const formContext = useFormContext()
  const submit = useSubmit()

  const { state } = useNavigation()
  const loading = state !== 'idle'

  const METHOD = 'POST'

  useFormFeedback(actionData)

  return (
    <RemixForm
      method={METHOD}
      onSubmit={(event) => {
        handleFormSubmit({ event, formContext, submit, method: METHOD })
      }}
      className="max-w-52 w-full mt-8 pb-8 sm:pb-16 mx-auto text-center"
    >
      <label htmlFor="codeField" className="sr-only">
        Code
      </label>

      <TextField
        fieldName="code"
        inputMode="decimal"
        onInput={(event) => {
          if (event.target.value.length > 6)
            event.target.value = event.target.value.slice(0, 6)
        }}
        onChange={(event) => {
          event.target.value = event.target.value.replace(/\D/g, '')
        }}
        sx={{
          maxWidth: 206,
          '.MuiInputBase-input': {
            textAlign: 'center',
            py: {
              sm: 0,
            },
            height: {
              sm: 60,
            },
            fontSize: {
              sm: 40,
              xs: 20,
            },
          },
        }}
      />

      <LoadingButton
        type="submit"
        loading={loading}
        variant="outlined"
        color="primary"
        sx={{
          fontWeight: 700,
          mt: {
            sm: '84px',
            xs: 2,
          },
          px: 0,
        }}
        size="large"
        fullWidth
      >
        Verify code
      </LoadingButton>
    </RemixForm>
  )
}

export const formValidation = zod.object({
  code: zod.string().length(6, 'Code must be 6 characters'),
})

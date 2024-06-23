import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useFormControl,
} from '@mui/material'
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from '@remix-run/react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useFormFeedback } from '~/common/hooks/use-form-feedback.hook'
import { handleFormSubmit } from '~/common/utils/handle-form-submit.util'
import { TextField } from '~/components/text-field.view'
import { useEffect, useId } from 'react'
import { LoadingButton } from '@mui/lab'

export const Form = () => {
  const { newPhone } = useLoaderData() as any

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(formValidation),
    defaultValues: {},
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
  const titleID = useId()
  const descriptionID = useId()
  const navigate = useNavigate()

  const { state } = useNavigation()
  const loading = state !== 'idle'

  const METHOD = 'POST'

  useFormFeedback(actionData)

  return (
    <RemixForm
      method={METHOD}
    >
      <Dialog
        open={true}
        onClose={() => {}}
        aria-labelledby={titleID}
        aria-describedby={descriptionID}
      >
        <DialogTitle id={titleID}>Delete my account</DialogTitle>

        <DialogContent dividers>
          <DialogContentText color="black" id={descriptionID}>
            Are you sure you want to delete your account? This action is
            irreversible.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            loading={loading}
            variant="text"
            color="error"
            type="submit"
            onClick={(event) => {
              handleFormSubmit({ formContext, submit, method: METHOD })
            }}
          >
            Delete my account
          </LoadingButton>

          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate('/settings')}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </RemixForm>
  )
}

export const formValidation = zod.object({})

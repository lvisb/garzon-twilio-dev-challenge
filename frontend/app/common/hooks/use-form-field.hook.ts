import { useFormContext } from 'react-hook-form'

import { objectGetValueAtPath } from '../utils/object-get-value-at-path.util'
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react'

export const useFormField = (fieldName: string) => {
  if (!fieldName) throw new Error(`[useFormField] fieldName missing.`)

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    control,
    trigger,
    getFieldState,
  } = useFormContext()

  const { state: formState } = useNavigation()
  const { isUpdate } = useLoaderData() as any

  const actionData = useActionData()

  const error = objectGetValueAtPath(errors, fieldName)
  const isPending = formState !== 'idle'
  const containErrors = !!error
  const errorMessage = error?.message
  const isFormSubmitted = !!actionData

  return {
    isPending,
    containErrors,
    errorMessage,
    register,
    getValues,
    setValue,
    isFormSubmitted,
    isUpdate,
    fieldName,
    control,
    trigger,
    getFieldState,
  }
}

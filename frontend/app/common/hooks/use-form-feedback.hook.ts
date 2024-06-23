import type { SerializeFrom } from '@remix-run/node'

import { useEffect } from 'react'

import { useFieldErrorsFromServer } from './use-field-errors-from-server.hook'
import { UNKNOWN_ERROR_JSON } from '../config/unknown-error-json.config'
import { useGlobalDialogStore } from '../global-dialog.store'

export const useFormFeedback = (
  actionData: SerializeFrom<ApiResponses.JsonResponse> | undefined,
) => {
  const { setErrors } = useFieldErrorsFromServer(actionData)
  const { openDialog, open } = useGlobalDialogStore((state) => {
    return state
  })

  useEffect(() => {
    if (actionData?.status === 'error') {
      if (actionData?.errors?.length) {
        openDialog(
          'There are fields with invalid data.\nPlease review them and try again.',
        )

        return
      }

      openDialog(actionData?.message || UNKNOWN_ERROR_JSON.message)

      return
    }
  }, [actionData, openDialog])

  useEffect(() => {
    if (actionData?.errors?.length) {
      if (open === false) {
        setErrors()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, actionData])
}

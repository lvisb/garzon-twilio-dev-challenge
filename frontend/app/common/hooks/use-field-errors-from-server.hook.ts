import type { SerializeFrom } from '@remix-run/node'

import { useFormContext } from 'react-hook-form'

export const useFieldErrorsFromServer = (
  actionData: SerializeFrom<ApiResponses.JsonResponse> | undefined,
) => {
  const { setError } = useFormContext()

  return {
    setErrors: () => {
      if (actionData?.errors?.length) {
        actionData.errors.forEach(({ field, message }, index) => {
          const isFirstItem = index === 0

          setError(field, { message }, { shouldFocus: isFirstItem })
        })
      }
    },
  }
}

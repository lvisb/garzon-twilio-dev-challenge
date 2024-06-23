import type { Navigation } from '@remix-run/react'

import { useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import { useState } from 'react'

export const useShouldResetField = () => {
  const formTransition = useNavigation()
  const actionData = useActionData() as any
  const [lastState, setLastState] = useState<Partial<Navigation>>({
    state: 'idle',
  })

  const { isUpdate } = useLoaderData() as any

  const isFormSubmitted =
    formTransition.state !== 'idle' && !!formTransition.formMethod

  if (
    formTransition.state === 'idle' &&
    lastState.state !== 'idle' &&
    lastState.formMethod != null &&
    lastState.formMethod.toUpperCase() !== 'GET'
  ) {
    return {
      isFormSubmitted,
      shouldReset: !isUpdate && actionData?.status === 'ok',
    }
  }

  if (formTransition.state !== lastState.state) {
    setLastState(formTransition)
  }

  return { isFormSubmitted, shouldReset: false }
}

import type { SubmitFunction, SubmitOptions } from '@remix-run/react'
import type { IStringifyOptions } from 'qs'
import type { UseFormReturn } from 'react-hook-form'

import qs from 'qs'

export const handleFormSubmit = async ({
  submit,
  formContext: { getValues, trigger },
  validate = true,
  method = 'GET',
  replace = false,
  qsOptions = { encodeValuesOnly: true },
  event,
  extraValues,
  actionType,
}: HandleFormSubmit) => {
  event?.preventDefault()

  if (validate && !(await trigger())) return

  const formValues = qs.stringify(
    { ...getValues(), ...extraValues, actionType },
    qsOptions,
  )

  submit(new URLSearchParams(formValues), {
    replace,
    method,
  })
}

type HandleFormSubmit = {
  submit: SubmitFunction
  formContext: UseFormReturn
  validate?: boolean
  method?: SubmitOptions['method']
  replace?: boolean
  qsOptions?: IStringifyOptions
  event?: React.FormEvent<HTMLFormElement>
  extraValues?: Record<string, string>
  actionType?: string
}

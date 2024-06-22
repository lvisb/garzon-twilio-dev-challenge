import { Form as RemixForm } from '@remix-run/react'
import { FormBody } from './form-body/form-body.view'
import { FormFooter } from './form-footer/form-footer.view'

export const Form = () => {
  return (
    <RemixForm>
      <FormBody />
      <FormFooter />
    </RemixForm>
  )
}

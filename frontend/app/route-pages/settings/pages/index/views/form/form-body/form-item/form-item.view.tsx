import { ReactNode } from 'react'
import { classNames } from '~/common/utils/class-names.util'

export type FormItemProps = {
  label: string
  children: ReactNode
  labelFor?: string
  required?: boolean
}

export const FormItem = ({
  children,
  label,
  labelFor,
  required,
}: FormItemProps) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={classNames(['block', required && 'after:content-["_*"]'])}
      >
        {label}
      </label>

      {children}
    </div>
  )
}

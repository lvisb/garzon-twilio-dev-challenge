import { Transform } from 'class-transformer'
import validator from 'validator'

export const ToBoolean = (strict = 1) => {
  return Transform(({ value }) => validator.toBoolean(value, strict))
}

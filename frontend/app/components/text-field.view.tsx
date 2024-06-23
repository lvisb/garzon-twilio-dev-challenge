import type { FilledInputProps, InputLabelProps, SxProps, Theme } from '@mui/material'
import type { ChangeEvent } from 'react'

import { TextField as MuiTextField, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'

import { useFormField } from '~/common/hooks/use-form-field.hook'
import { FormComponent } from '~/common/types/form-component.type'

export const TextField = ({
  label,
  fieldName,
  helperText,
  required,
  inputMode,
  maskOptions,
  inputProps,
  inputLabelProps,
  size,
  onChange,
  onKeyDown,
  onBlur,
  minRows = 4,
  maxRows = 4,
  readOnly = false,
  multiline = false,
  absoluteHelperText = false,
  type = 'text',
  forceDisable = false,
  sx,
  onInput,
}: TextFieldProps) => {
  const { containErrors, errorMessage, isPending, register } =
    useFormField(fieldName!)

  const ref = useRef<HTMLInputElement>(null)

  const { palette } = useTheme()

  if (maskOptions) {
    useEffect(() => {
      if (!ref.current) return

      const mask = new Inputmask(maskOptions).mask(ref.current)

      return () => mask.remove()
    }, [])
  }

  const fieldRegister = register(fieldName!)

  return (
    <MuiTextField
      {...fieldRegister}
      fullWidth
      inputRef={ref}
      label={label}
      helperText={containErrors ? errorMessage.toString() : helperText}
      error={containErrors}
      disabled={forceDisable || isPending}
      inputMode={inputMode}
      InputProps={{ ...inputProps, readOnly }}
      InputLabelProps={inputLabelProps}
      minRows={minRows}
      maxRows={maxRows}
      multiline={multiline}
      onInput={onInput}
      onKeyDown={onKeyDown}
      onChange={(event) => {
        fieldRegister.onChange(event)

        if (onChange) onChange(event as ChangeEvent<HTMLInputElement>)
      }}
      onBlur={(event) => {
        fieldRegister.onBlur(event)

        if (onBlur) onBlur(event as ChangeEvent<HTMLInputElement>)
      }}
      type={type}
      size={size}
      sx={{
        opacity: readOnly ? 0.5 : 1,
        '& label': {
          color: required ? 'black' : 'gray',
        },
        '& input, & .MuiInputBase-root': {
          backgroundColor: required ? palette.bgRequired.main : 'transparent',
        },
        '& .MuiFormHelperText-root': absoluteHelperText
          ? {
              position: 'absolute',
              bottom: '-1.2rem',
            }
          : {},
        ...sx
      }}
    />
  )
}

export interface TextFieldProps extends FormComponent {
  maskOptions?: Inputmask.Options
  type?: React.InputHTMLAttributes<unknown>['type']
  inputProps?: Partial<FilledInputProps>
  inputLabelProps?: Partial<InputLabelProps>
  size?: 'small' | 'medium'
  readOnly?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: ChangeEvent<HTMLInputElement>) => void
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  multiline?: boolean
  maxRows?: number
  minRows?: number
  absoluteHelperText?: boolean
  forceDisable?: boolean
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined
  sx?: SxProps<Theme>
}

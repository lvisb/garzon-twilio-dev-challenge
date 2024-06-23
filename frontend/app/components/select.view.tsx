import type { SelectChangeEvent } from '@mui/material'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  styled,
  useTheme,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useFormField } from '~/common/hooks/use-form-field.hook'
import { FormComponent } from '~/common/types/form-component.type'

export const Select = ({
  label,
  fieldName,
  helperText,
  required,
  options,
  onBlur,
  defaultValue = '',
  disabled = false,
  addSelectValue = true,
}: Props) => {
  const { palette } = useTheme()

  const { control, containErrors, errorMessage, getValues } =
    useFormField(fieldName!)

  const [ops, setOptions] = useState(options)
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (options.length === 0) setValue(defaultValue)

    setOptions(options)
  }, [options])

  useEffect(() => {
    setValue(getValues(fieldName!) || defaultValue)
  }, [getValues(fieldName!)])

  const constructedOptions = addSelectValue
    ? [{ label: 'Select', value: '' }, ...ops]
    : [...ops]

  return (
    <FormControl fullWidth sx={{ opacity: disabled ? 0.3 : 1 }}>
      <InputLabel id={`label-${fieldName}`} error={containErrors}>
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={fieldName!}
        render={({ field }) => (
          <CustomMuiSelect
            labelId={`label-${field.name}`}
            label={label}
            id={field.name}
            name={field.name}
            disabled={disabled}
            value={value}
            error={containErrors}
            backgroundColor={required && palette.bgRequired.main}
            onChange={(event: SelectChangeEvent<unknown>) => {
              field.onChange(event)

              setValue((event.target as HTMLSelectElement).value)
            }}
            onBlur={onBlur}
          >
            {constructedOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomMuiSelect>
        )}
      />
      <FormHelperText error={containErrors}>
        {containErrors ? errorMessage.toString() : helperText}
      </FormHelperText>
    </FormControl>
  )
}

interface Props extends FormComponent {
  options: SelectOption[]
  defaultValue?: string
  disabled?: boolean
  addSelectValue?: boolean
  onBlur?: () => void
}

export type SelectOption = {
  label: string
  value: string | number
}

const CustomMuiSelect = styled(MuiSelect, {
  shouldForwardProp: (propName: string) => propName !== 'backgroundColor',
})(({ backgroundColor }: ExtraProps) => ({
  '& .MuiInputBase-input': {
    backgroundColor: backgroundColor || 'transparent',
  },
}))

interface ExtraProps {
  backgroundColor?: string
}

import {
  Autocomplete,
  FormHelperText,
  LinearProgress,
  TextField,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useFormField } from '~/common/hooks/use-form-field.hook'
import { useShouldResetField } from '~/common/hooks/use-should-reset-field.hook'
import { FormComponent } from '~/common/types/form-component.type'

export const SelectSingle = ({
  label,
  fieldName,
  options,
  initialValue,
  helperText,
  required,
  isLoading = false,
  disabled = false,
}: Props) => {
  const { palette } = useTheme()

  const { control, getValues, containErrors, errorMessage } =
    useFormField(fieldName!)

  const fieldValue = getValues(fieldName!)
  const [inputValue, setInputValue] = useState('')

  const { shouldReset, isFormSubmitted } = useShouldResetField()

  const findOptionByValue = (value: string) => {
    return options.find((op) => op.value === value) || null
  }

  useEffect(() => {
    if (shouldReset) setSelectedOption(null)
  }, [isFormSubmitted, shouldReset])

  const [selectedOption, setSelectedOption] = useState(
    findOptionByValue(initialValue!),
  )

  useEffect(() => {
    if (!shouldReset && fieldValue)
      setSelectedOption(findOptionByValue(fieldValue))
  }, [fieldValue, options])

  return (
    <>
      <Controller
        name={fieldName!}
        control={control}
        render={({ field }) => (
          <>
            <Autocomplete<SelectSingleOption, false>
              value={selectedOption}
              disabled={disabled}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) =>
                setInputValue(newInputValue)
              }
              onChange={(_, option) => {
                field.onChange((option as SelectSingleOption)?.value)

                setSelectedOption(option as SelectSingleOption)
              }}
              groupBy={(option) => option.firstLetter}
              isOptionEqualToValue={(option, selectedOption) =>
                option.value === selectedOption.value
              }
              getOptionLabel={(option) => {
                return (option as SelectSingleOption)?.label || ''
              }}
              options={options.sort(
                (a: SelectSingleOption, b: SelectSingleOption) =>
                  -b.firstLetter.localeCompare(a.firstLetter),
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder="Selecione"
                  error={containErrors}
                  {...field}
                  onChange={() => {}}
                />
              )}
              sx={{
                backgroundColor: required ? palette.bgRequired.main : 'white',
                opacity: disabled || isLoading ? 0.5 : 1,
              }}
            />

            <FormHelperText error={containErrors} sx={{ mt: -1, ml: 2 }}>
              {containErrors ? errorMessage.toString() : helperText}
            </FormHelperText>

            {isLoading && <LinearProgress variant="query" />}
          </>
        )}
      />
    </>
  )
}

interface Props extends FormComponent {
  options: SelectSingleOption[]
  initialValue?: string
  disabled?: boolean
  isLoading?: boolean
}

export interface SelectSingleOption {
  label: string
  value: string
  firstLetter: string
}

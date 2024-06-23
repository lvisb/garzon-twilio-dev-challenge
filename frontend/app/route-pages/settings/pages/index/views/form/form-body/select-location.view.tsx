import {
  Autocomplete,
  FormHelperText,
  LinearProgress,
  TextField,
  useTheme,
} from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useFormField } from '~/common/hooks/use-form-field.hook'
import { FormComponent } from '~/common/types/form-component.type'

export const SelectLocation = ({
  label,
  fieldName,
  initialValue,
  helperText,
  required,
  isLoading = false,
  disabled = false,
}: Props) => {
  const { token, apiClientBaseUrl, userJson } = useLoaderData() as any

  const [options, setOptions] = useState<SelectSingleOption[]>([])
  const { palette } = useTheme()

  const { control, getValues, containErrors, errorMessage, setValue } =
    useFormField(fieldName!)

  const fieldValue = getValues(fieldName!)
  const [inputValue, setInputValue] = useState('')

  const findOptionByValue = (value: string) => {
    return options.find((op) => op.value === value) || null
  }

  const [selectedOption, setSelectedOption] = useState(
    findOptionByValue(initialValue!),
  )

  useEffect(() => {
    if (!fieldValue) return

    const option = findOptionByValue(fieldValue)

    if (option) {
      setValue('latitude', option?.latitude)
      setValue('longitude', option?.longitude)
    }

    setSelectedOption(option)
  }, [fieldValue, options, findOptionByValue])

  useEffect(() => {
    if (!userJson || !userJson.user) return

    const locationValue = getValues(fieldName!)

    if(!locationValue) return

    setOptions([
      {
        label: locationValue,
        value: locationValue,
        latitude: userJson.user.settings.latitude,
        longitude: userJson.user.settings.longitude,
        firstLetter: locationValue[0].toUpperCase(),
      },
    ])
  }, [])

  const fetch = useCallback(async () => {
    if (!inputValue) return

    const r = await axios.get(`${apiClientBaseUrl}/api/user/address`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { address: inputValue },
    })

    setOptions(
      r.data.results.map((op: any) => ({
        label: op.address,
        value: op.address,
        latitude: op.latitude,
        longitude: op.longitude,
        firstLetter: op.address[0].toUpperCase(),
      })),
    )
  }, [inputValue, apiClientBaseUrl, token])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch()
    }, 800)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

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
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              onChange={(_, option) => {
                field.onChange((option as SelectSingleOption)?.value)

                setSelectedOption(option as SelectSingleOption)
              }}
              isOptionEqualToValue={(option, selectedOption) =>
                option.value === selectedOption.value
              }
              getOptionLabel={(option) => {
                return (option as SelectSingleOption)?.label || ''
              }}
              options={options}
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
  initialValue?: string
  disabled?: boolean
  isLoading?: boolean
}

export interface SelectSingleOption {
  label: string
  value: string
  latitude: number
  longitude: number
  firstLetter: string
}

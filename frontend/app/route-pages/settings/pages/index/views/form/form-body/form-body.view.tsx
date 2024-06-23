import {
  Autocomplete,
  Checkbox,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
  TextField as MuiTextField,
} from '@mui/material'
import { FormItem } from './form-item/form-item.view'
import { Divider } from '../../divider/divider.view'
import { useEffect, useState } from 'react'
import { TextField } from '~/components/text-field.view'
import { Select } from '~/components/select.view'
import { zodiacOptions } from '../../../data/zodiac-options.data'
import { SelectSingle } from '~/components/select-single.view'
import { timezones } from '../../../data/timezone.data'

type Place = {
  label: string
}

export const FormBody = () => {
  const [locationValue, setLocationValue] = useState<Place | null>(null)
  const [locationInputValue, setLocationInputValue] = useState('')
  const [locationOptions, setLocationOptions] = useState<readonly Place[]>([])

  useEffect(() => {
    if (locationInputValue === '') {
      setLocationOptions(locationValue ? [locationValue] : [])
      return undefined
    }

    ;(() => {
      let newOptions: readonly Place[] = []

      if (locationValue) {
        newOptions = [locationValue]
      }

      newOptions = [
        ...[
          {
            label: 'São Paulo',
          },
          {
            label: 'Chicago',
          },
        ],
        ...newOptions,
      ]

      setLocationOptions(newOptions)
    })()
  }, [locationValue, locationInputValue])

  return (
    <div className="grid gap-4">
      <TextField label="Name" fieldName="name" required />

      <TextField
        label="Email"
        fieldName="email"
        inputMode="email"
        forceDisable={true}
        required
      />

      <Select
        label="Zodiac Sign"
        fieldName="zodiacSign"
        options={zodiacOptions}
      ></Select>

      <SelectSingle
        label="Timezone"
        fieldName="timezone"
        options={timezones.map((value: string) => ({
          label: value,
          value,
          firstLetter: value[0].toUpperCase(),
        }))}
        required={true}
      />

      <FormItem label="Location" labelFor="locationField">
        <Autocomplete
          id="locationField"
          filterOptions={(x) => x}
          noOptionsText="No locations"
          options={locationOptions}
          renderInput={(params) => <MuiTextField {...params} fullWidth />}
          onChange={(event: any, newValue: Place | null) => {
            setLocationOptions(
              newValue ? [newValue, ...locationOptions] : locationOptions,
            )
            setLocationValue(newValue)
          }}
          onInputChange={(event, newInputValue) => {
            setLocationInputValue(newInputValue)
          }}
          autoComplete
          disablePortal
          fullWidth
          filterSelectedOptions
        />
      </FormItem>

      <Divider />

      <div className="flex items-center">
        <Checkbox
          id="smsField"
          className="shrink-0"
          aria-describedby="helperTextSMSField"
        />

        <label htmlFor="smsField" className="shrink-0">
          SMS
        </label>

        <FormHelperText id="helperTextSMSField" className="shrink-0 pl-2">
          for daily sms summary
        </FormHelperText>
      </div>

      <FormItem label="Phone">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-20 sm:w-24">
            <label htmlFor="phoneCountryCodeField" className="sr-only">
              Phone country code
            </label>

            <TextField
              inputMode="decimal"
              fieldName="phoneCountryCode"
              fullWidth
            />
          </div>

          <div className="grow">
            <label htmlFor="phoneNumberField" className="sr-only">
              Phone number
            </label>

            <TextField fieldName="phoneNumber" inputMode="decimal" fullWidth />
          </div>
        </div>
      </FormItem>
    </div>
  )
}

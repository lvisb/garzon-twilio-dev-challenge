import {
  Autocomplete,
  Checkbox,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { FormItem } from './form-item/form-item.view'
import { Divider } from '../../divider/divider.view'
import { useEffect, useState } from 'react'

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
      <FormItem label="Name" labelFor="nameField" required>
        <TextField type="text" id="nameField" fullWidth />
      </FormItem>

      <FormItem label="Email" labelFor="emailField" required>
        <TextField type="text" id="emailField" inputMode="email" fullWidth />
      </FormItem>

      <FormItem label="Zodiac Sign" labelFor="zodiacSignField">
        <Select id="zodiacSignField" fullWidth>
          <MenuItem>Select</MenuItem>
          <MenuItem value="lorem">Lorem</MenuItem>
          <MenuItem value="ipsum">Ipsum</MenuItem>
        </Select>
      </FormItem>

      <FormItem label="Timezone" labelFor="timezoneField" required>
        <Autocomplete
          id="timezoneField"
          renderInput={(params) => <TextField {...params} fullWidth />}
          options={[
            {
              label: 'America/Chicago',
            },
            {
              label: 'America/Sao_Paulo',
            },
          ]}
          disablePortal
          fullWidth
        />
      </FormItem>

      <FormItem label="Location" labelFor="locationField">
        <Autocomplete
          id="locationField"
          filterOptions={(x) => x}
          noOptionsText="No locations"
          options={locationOptions}
          renderInput={(params) => <TextField {...params} fullWidth />}
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
              type="text"
              id="phoneCountryCodeField"
              inputMode="decimal"
              fullWidth
            />
          </div>

          <div className="grow">
            <label htmlFor="phoneNumberField" className="sr-only">
              Phone number
            </label>

            <TextField
              type="text"
              id="phoneNumberField"
              inputMode="decimal"
              fullWidth
            />
          </div>
        </div>
      </FormItem>
    </div>
  )
}

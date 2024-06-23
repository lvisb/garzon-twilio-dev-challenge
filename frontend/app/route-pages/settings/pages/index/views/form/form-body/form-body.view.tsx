import { Divider } from '../../divider/divider.view'
import { TextField } from '~/components/text-field.view'
import { Select } from '~/components/select.view'
import { zodiacOptions } from '../../../data/zodiac-options.data'
import { SelectSingle } from '~/components/select-single.view'
import { timezones } from '../../../data/timezone.data'
import { SelectLocation } from './select-location.view'
import { CheckboxSms } from './checkbox-sms.view'

export const FormBody = () => {
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

      <SelectLocation
        fieldName="location"
        label="Location"
        helperText="for weather forecast"
      />

      <Divider />

      <CheckboxSms />

      <div className="flex items-center gap-4">
        <div className="shrink-0 w-20 sm:w-24">
          <TextField
            fieldName="phoneCountryCode"
            inputMode="decimal"
            label="Phone"
            helperText="+XX"
          />
        </div>

        <div className="grow">
          <TextField
            fieldName="phone"
            inputMode="tel"
            label="Phone"
            helperText=" "
            onChange={(event) => {
              event.target.value = event.target.value.replace(/\D/g, '')
            }}
          />
        </div>
      </div>
    </div>
  )
}

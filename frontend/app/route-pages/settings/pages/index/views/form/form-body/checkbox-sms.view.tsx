import { Checkbox, FormHelperText } from "@mui/material"
import { useState } from "react"
import { useFormField } from "~/common/hooks/use-form-field.hook"

export const CheckboxSms = () => {
  const {getValues, setValue } = useFormField('phoneActive')

  const [phoneActive, setPhoneActive] = useState(getValues('phoneActive'))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('phoneActive', event.target.checked)
    setPhoneActive(event.target.checked);
  };

  return (
    <div className="flex items-center">
      <Checkbox
        id="phoneActive"
        name="phoneActive"
        className="shrink-0"
        aria-describedby="helperTextSMSField"
        checked={phoneActive}
        onChange={handleChange}
      />

      <label htmlFor="phoneActive" className="shrink-0">
        SMS
      </label>

      <FormHelperText id="helperTextSMSField" className="shrink-0 pl-2">
        for daily sms summary
      </FormHelperText>
    </div>
  )
}

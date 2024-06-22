import { Form } from './views/form/form.view'
import { SecondaryActions } from './views/secondary-actions/secondary-actions.view'

export const SettingsIndexView = () => {
  return (
    <div>
      <h1 className="mb-9 text-[1.75rem] leading-snug font-bold text-center">
        Enter your information to receive a more comprehensive daily summary.
      </h1>

      <div className="max-w-[30rem] w-full mx-auto">
        <Form />
        <SecondaryActions />
      </div>
    </div>
  )
}

import { Title } from './title.view'

export const Article = () => {
  return (
    <article className="max-w-md sm:max-w-[50rem] w-full mx-auto mt-8 mb-6 space-y-4 text-[1.50rem] text-justify">
      <p>
        I take your privacy very seriously. Ensuring that your data is secure
        and private is a fundamental priority for me.
      </p>

      <Title>Collection and Use of Data:</Title>

      <ul>
        <li>
          <strong>Information Collected:</strong> To provide my services, I
          collect only necessary information: your name, email, and timezone,
          which are mandatory. Optionally, you may provide your location, zodiac
          sign, and phone number.
        </li>
        <li>
          <strong>How Your Data is Used:</strong> Agenda information, name, and
          email are obtained through the Nylas API (
          <a href="https://www.nylas.com/privacy-policy" className="underline">
            Nylas privacy policy
          </a>
          ). The agenda data is then sent as a prompt to the OpenAI API to
          generate a summary of your daily tasks.
        </li>
        <li>
          <strong>Access Limitations:</strong> The application has read-only
          permissions for your data, meaning it cannot alter your schedule,
          email, or name on external platforms such as Google, Microsoft, and
          Apple. Any changes made in the form are only updated within the Garzón
          app.
        </li>
      </ul>

      <Title>Security and Data Deletion:</Title>

      <ul>
        <li>
          <strong>Secure Storage:</strong> Your data is stored securely using
          best practices in information security.
        </li>
        <li>
          <strong>Account Deletion:</strong> You can delete your account at any
          time through the{' '}
          <a href="/settings" className="underline">
            settings
          </a>{' '}
          page. Upon deletion, I retain only your zodiac sign and information
          about which platform was used for login (Google, Microsoft, or Apple).
          All other information, including your name, email, phone number, and
          location, is permanently deleted. Additionally, access permission to
          the Nylas API is revoked.
        </li>
        <li>
          <strong>New Account:</strong> After deleting your account, you can
          create a new account from scratch with no connection to the previously
          deleted account. This ensures that all data from the previous account
          is no longer accessible or associated with your new account.
        </li>
      </ul>

      <p>
        <strong>Temporary Project:</strong> Please note that this project will
        be available for a short period of time. When the project goes offline,
        all traces of your information will be erased and no data will be
        retained.
      </p>

      <p>
        Your trust is important to me, and I am committed to protecting your
        personal information. If you have any questions about my privacy policy,
        please don't hesitate to{' '}
        <a href="mailto:garzon@migarzon.online" className="underline">contact me</a>.
      </p>
    </article>
  )
}

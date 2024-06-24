*This is a submission for [Twilio Challenge v24.06.12](https://dev.to/challenges/twilio)*

![Garzón - Your Daily Dose of Organization and Inspiration!](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7pz2rbi3fdxg7xl2p3x5.png)

## What I Built
Garzón is a web application designed to streamline and enhance users' daily lives by providing them with a personalized summary of their agenda, daily horoscope, weather forecast, and a motivational quote. The app delivers this comprehensive overview via email and, optionally, a brief summary through SMS, ensuring users are well-informed and motivated to tackle their day.

The name "Garzón" is inspired by the Spanish word for "waiter," symbolizing the app's role in serving a daily summary to its users, much like a waiter serves a meal.

**FEATURES**

**Agenda Summary**
- Garzón connects seamlessly to users' Google, Apple, or Microsoft calendars to provide a concise summary of their tasks and appointments for the day.
- This feature helps users stay organized and aware of their daily commitments.

**Daily Horoscope**
- Users receive a personalized horoscope based on their zodiac sign.
- This feature adds a touch of fun and insight into what the stars might have in store for them each day.

**Weather Forecast**
- Garzón provides a daily weather forecast based on the user's current location.
- This helps users plan their day more effectively, whether they need to dress warmly or carry an umbrella.

**Motivational Quote**
- Each day, users receive an inspirational quote to boost their motivation and positivity.
- This feature aims to improve the user's mood and productivity.

**Communication Options**
- Users receive their daily summary via email, which is an essential feature.
- For those who prefer brevity or need quick updates, an SMS option is available for a brief summary.

**User Experience**
Garzón is designed to be user-friendly and efficient, ensuring that the daily summary is comprehensive yet concise. The app's interface is intuitive, allowing users to easily customize their preferences for receiving updates.

## Demo

Check it out here: [migarzon.online](https://migarzon.online)
Source code: [GitHub](https://github.com/lvisb/garzon-twilio-dev-challenge)

![Garzón - App](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gidvt5k31m3fch6wxs5u.png)

![Garzón - Email](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q1xtyaprcbn9xiy70n8v.png)

**Note: App in Google Sandbox**

The app is currently in Google's Sandbox and has not been fully approved yet. When attempting to log in, you will encounter a caution alert.

How to Proceed:

1.Click on "Advanced".
2.Then click on "Access nylas.com" for secure calendar integration.

_You can be confident that the app is secure. It only has read-only access to your name, email, and calendar events. If you have any concerns, please consult our Privacy Policy on our website_

**Note: iCloud Calendar**

To access Apple Calendar through third-party apps, you need to create an app-specific password. This ensures security without sharing your main Apple ID password. For details, visit https://support.apple.com/en-us/102654.

## Twilio and AI
Garzón utilizes Twilio SendGrid for email delivery, Twilio Verify for phone number validation, and Twilio Messaging for SMS notifications. The AI compiles a succinct summary of the user's agenda. Weather forecasts are sourced from an API and processed by AI to provide a user-friendly summary, omitting technical data. Horoscopes are scraped from a website, with AI generating a brief daily horoscope. Additionally, AI generates motivational quotes. The app's logo was also created using AI technology. All information is then formatted and sent via Twilio's APIs for email and SMS delivery.

## Additional Prize Categories

Twilio Times Two, Impactful Innovators, Entertaining Endeavors

https://dev.to/asyncerror
# garzon-twilio-dev-challenge
Project for the Twilio Challenge organized by DEV.

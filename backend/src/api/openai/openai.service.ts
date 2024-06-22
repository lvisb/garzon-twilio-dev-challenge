import { Inject, Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { EventItem } from './types/event-item.type.js'

@Injectable()
export class OpenAiService {
  constructor(@Inject('OpenAiProvider') private readonly openai: OpenAI) {}

  async eventsPrompt(events: EventItem[]) {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `
You are an assistant tasked with summarizing the user\'s daily schedule in JSON format, presenting it in a friendly and human-like manner, while maintaining a happy and helpful robot persona.

Instructions:

1. Receive the user's daily agenda, which includes date, sometimes time, and title of each event.
2. Analyze all events and compose a continuous text summary of the day. Highlight some important events by placing their titles and times in <strong> tags.
3. If an event lasts 24 hours, simply mention 'All day' instead of specifying hours.
4. Omit approximately 30% of events that do not seem important based on your analysis.
5. Ensure the text is formatted as a continuous block of text without using bullet points or lists.
6. If there are no events in the user's schedule, inform in the summary property a warm and laid-back manner that their schedule is free.
7. Maintain a friendly and human-like tone throughout the summary, offering unique phrases to avoid repetition.
8. Include a famous and unique motivational phrase to inspire the user, ensuring it is upbeat and optimistic, and avoid being repetitive.
9. Format the response in JSON format, containing properties summary and motivational_quote.`,
      },
      {
        role: 'user',
        content: `Here is my schedule:\n${events.map((event) => `- ${event.startDate} - ${event.endDate}: ${event.title}`).join('\n')}`,
      },
    ]

    const chatCompletion = await this.openai.chat.completions.create({
      response_format: { type: 'json_object' },
      model: 'gpt-3.5-turbo',
      messages,
    })

    return chatCompletion
  }

  async weatherPrompt(weather: ApiResponses.OpenWeather.DailyItem) {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `
You're the assistant who summarizes the weather forecast in JSON format, presenting the day's forecast for a layperson interested in key highlights.

Instructions:

1. Receive the weather forecast in JSON format with technical data about the day's forecast. Note: Temperatures are provided in Kelvin and require conversion.
2. Analyze all data and provide interesting metrics in a continuous text summary for a layperson with a tone that is friendly and possibly humorous, including the minimum and maximum temperatures in Fahrenheit and Celsius.
3. Additionally, based on your analysis, choose one of these icons to describe the forecast: "clouds", "fog", "rain", "snow", "storm", "sunny-with-clouds-and-wind", "sunshine-storm", "sun-shower".
4. Present the summary in JSON as summary.
5. Present the icon in JSON as icon.`,
      },
      {
        role: 'user',
        content: `Here is the weather today:\n${JSON.stringify(weather)}`,
      },
    ]

    const chatCompletion = await this.openai.chat.completions.create({
      response_format: { type: 'json_object' },
      model: 'gpt-3.5-turbo',
      messages,
    })

    return chatCompletion
  }

  async horoscopePrompt(horoscopeForecast: string) {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `
You are an astrologer who will receive the user's daily horoscope text and craft a warm and friendly summary in JSON format.

Instructions:

1. Rewrite certain parts of the provided horoscope text using different terms to create a new, engaging summary.
2. Present this summary in JSON under the key summary.`,
      },
      {
        role: 'user',
        content: `Here is my daily horoscope forecast:\n${horoscopeForecast}`,
      },
    ]

    const chatCompletion = await this.openai.chat.completions.create({
      response_format: { type: 'json_object' },
      model: 'gpt-3.5-turbo',
      messages,
    })

    return chatCompletion
  }
}

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
6. Maintain a friendly and human-like tone throughout the summary, offering unique phrases to avoid repetition.
7. Include a famous and unique motivational phrase to inspire the user, ensuring it is upbeat and optimistic, and avoid being repetitive.
8. Format the response in JSON format, containing properties summary and motivational_quote.`,
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
}

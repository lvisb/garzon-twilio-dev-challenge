import { ZodiacSign } from '#common/utils/zodiac-signs.util.js'
import { Injectable } from '@nestjs/common'
import axios, { Axios } from 'axios'
import * as cheerio from 'cheerio'

@Injectable()
export class AstrologyService {
  protected axios: Axios

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://www.astrology.com/horoscope/daily',
    })
  }

  async daily(zodiacSign: ZodiacSign) {
    const html = await this.axios.get(`/${zodiacSign.toLowerCase()}.html`)

    const $ = cheerio.load(html.data)

    const prediction = $('#content').text()

    return prediction
  }
}

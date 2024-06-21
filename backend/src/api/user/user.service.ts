import { DbService } from '#db/db.service.js'
import { User } from '#db/entities/user.entity.js'
import { Injectable } from '@nestjs/common'
import { TokenDto } from './dtos/token.dto.js'
import { JwtService } from '@nestjs/jwt'
import { EnvService } from '#env/env.service.js'
import { UpdateUserDto } from './dtos/update-user.dto.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { UserEventsFetchException } from '#common/exceptions/user-events.exception.js'
import { AxiosError } from 'axios'
import { OpenAiService } from '#api/openai/openai.service.js'
import { parseISO } from 'date-fns'

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
    private readonly nylasService: NylasService,
    private readonly openAiService: OpenAiService,
  ) {}

  loadUserById(userId: string) {
    return this.dbService.userRepo.findOne({
      where: { userId },
    })
  }

  loadUserByEmail(email: string) {
    return this.dbService.userRepo.findOne({
      where: { email, isActive: true },
    })
  }

  saveUser(user: User) {
    return this.dbService.userRepo.save(user)
  }

  updateUser(user: User, dto: UpdateUserDto) {
    if (dto.name) user.name = dto.name

    user.settings.address = dto.address
    user.settings.latitude = dto.latitude
    user.settings.longitude = dto.longitude
    user.settings.zodiacSign = dto.zodiacSign
    user.timezone = dto.timezone
    user.phoneActive = dto.phoneActive
    user.phone = dto.phone

    return this.dbService.userRepo.save(user)
  }

  generateToken(user: User) {
    const { userId } = user

    const payload: TokenDto = { sub: userId }

    return this.jwtService.sign(payload, {
      secret: this.envService.getValue('JWT_SECRET'),
    })
  }

  async events(user: User, startDate: Date, endDate: Date) {
    const evs: ApiResponses.Nylas.Events.EventItem[] = []

    try {
      const calendars = await this.nylasService.calendars(user.grantId)

      for (const calendar of calendars.data.data) {
        try {
          const ev = await this.nylasService.calendarEvents(
            calendar.id,
            user.grantId,
            startDate,
            endDate,
          )

          evs.push(...ev.data.data)
        } catch (error) {}
      }
    } catch (error) {
      if (error instanceof AxiosError)
        console.error(UserService.name, error.response.data)
      else if (error instanceof Error)
        console.error(UserService.name, error.message)

      throw new UserEventsFetchException()
    }

    return evs
  }

  async deleteUser(user: User) {
    user.isActive = false
    user.grantId = null
    user.email = 'DELETED'
    user.name = 'DELETED'
    user.settings.address = undefined
    user.settings.latitude = 0
    user.settings.longitude = 0
    user.phoneActive = false
    user.phone = null

    await this.dbService.userRepo.save(user)
    await this.dbService.userRepo.softDelete({ userId: user.userId })
  }
}

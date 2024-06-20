import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { UserService } from './user.service.js'
import { CodeDto } from '#api/user/dtos/code.dto.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { User } from '#db/entities/user.entity.js'
import { UpdateUserDto } from './dtos/update-user.dto.js'
import { UserGuard } from './guards/user.guard.js'
import { SignedInRequest } from '#common/utils/signed-in-request.util.js'
import { OpenAiService } from '#api/openai/openai.service.js'
import { SendGridService } from '#twilio/sendgrid/sendgrid.service.js'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { GoogleMapsService } from '#google-maps/google-maps.service.js'
import { VerifyService } from '#twilio/verify/verify.service.js'
import { VerifyCodeNotFoundException } from '#common/exceptions/verify-code-not-found.exception.js'
import { UnknownErrorException } from '#common/exceptions/unknown-error.exception.js'
import { InvalidVerifyCodeException } from '#common/exceptions/invalid-verify-code.exception.js'
import { FindAddressDto } from './dtos/find-address.dto.js'

@Controller('api/user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly nylasService: NylasService,
    private readonly openaiService: OpenAiService,
    private readonly sendGridService: SendGridService,
    private readonly openWeatherService: OpenWeatherService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly verifyService: VerifyService,
  ) {}

  @Post('connect')
  async connect(@Body() dto: CodeDto) {
    const { code } = dto

    try {
      const result = await this.nylasService.token(code)
      const info = this.nylasService.extractTokenInfo(result.data.id_token)

      let user = await this.service.loadUserByEmail(info.email)

      if (!user) {
        user = new User()

        user.name = info.name
        user.email = info.email
        user.grantId = info.sub
        user.provider = result.data.provider

        await this.service.saveUser(user)
      }

      const token = this.service.generateToken(user)

      return HttpResponse.createBody({ token })
    } catch (error) {
      console.error(error)

      throw new UnknownErrorException()
    }
  }

  @UseGuards(UserGuard)
  @Get('address')
  async address(@Req() req: SignedInRequest, @Query() dto: FindAddressDto) {
    try {
      const addressResponse = await this.googleMapsService.address(dto.address)

      return HttpResponse.createBody({
        results: addressResponse.data.results.map((result) => ({
          address: result.formatted_address,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        })),
      })
    } catch (error) {
      console.error(error)

      throw new UnknownErrorException()
    }
  }

  @UseGuards(UserGuard)
  @Patch('verify-code')
  async verifyCode(@Req() req: SignedInRequest, @Body() dto: CodeDto) {
    const user = req.user

    try {
      const verified = await this.verifyService.validateCode(
        dto.phone,
        dto.code,
      )

      if (!verified.valid) throw new InvalidVerifyCodeException()

      user.phone = dto.phone

      await this.service.saveUser(user)

      return HttpResponse.createBody({})
    } catch (error) {
      if (error instanceof InvalidVerifyCodeException) throw error

      if (typeof error === 'object') {
        if ('status' in error && error.status === 404)
          throw new VerifyCodeNotFoundException()
      }

      console.error(error)

      throw new UnknownErrorException()
    }
  }

  @UseGuards(UserGuard)
  @Patch()
  async updateUser(@Req() req: SignedInRequest, @Body() dto: UpdateUserDto) {
    const user = req.user

    if (dto.phone && user.phone !== dto.phone) {
      try {
        await this.verifyService.sendCode(dto.phone)

        return HttpResponse.createBody({ id: 'code_sent' })
      } catch (error) {
        console.error(error)

        throw new UnknownErrorException()
      }
    }

    await this.service.updateUser(req.user, dto)

    return HttpResponse.createBody({})
  }
}

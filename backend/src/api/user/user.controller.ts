import {
  Body,
  Controller,
  Delete,
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
import { GoogleMapsService } from '#google-maps/google-maps.service.js'
import { VerifyService } from '#twilio/verify/verify.service.js'
import { VerifyCodeNotFoundException } from '#common/exceptions/verify-code-not-found.exception.js'
import { UnknownErrorException } from '#common/exceptions/unknown-error.exception.js'
import { InvalidVerifyCodeException } from '#common/exceptions/invalid-verify-code.exception.js'
import { FindAddressDto } from './dtos/find-address.dto.js'
import { ConnectCodeDto } from './dtos/connect-code.dto.js'
import { AxiosError } from 'axios'
import { GrantInvalidException } from '#common/exceptions/grant-invalid.exception.js'
import { consoleError } from '#common/utils/console-error.util.js'
import { DailySummaryService } from '#api/daily-summary/daily-summary.service.js'

@Controller('api/user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly nylasService: NylasService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly verifyService: VerifyService,
    private readonly dailySummaryService: DailySummaryService,
  ) {}

  private userResponse(user: User) {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      phoneActive: user.phoneActive,
      isActive: user.isActive,
      settings: user.settings,
      timezone: user.timezone,
    }
  }

  /**
   * After connecting the account to the platform, Nylas redirects to the Callback
   * URI with a query code. With this code, we need to extract a grantId that
   * will allow us to retrieve calendar data.
   */
  @Post('connect')
  async connect(@Body() dto: ConnectCodeDto) {
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
        user.isActive = false

        await this.service.saveUser(user)
      }

      const token = this.service.generateToken(user)

      return HttpResponse.createBody({ token, user: this.userResponse(user) })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          if (error.response.data.error === 'invalid_grant') {
            throw new GrantInvalidException()
          }
        }
      }

      consoleError(error)

      throw new UnknownErrorException()
    }
  }

  @UseGuards(UserGuard)
  @Get()
  async getUser(@Req() req: SignedInRequest) {
    return HttpResponse.createBody({
      user: this.userResponse(req.user),
    })
  }

  /**
   * Endpoint to retrieve addresses with latitude and longitude in live search.
   * Used when the user starts filling in the address.
   */
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
      consoleError(error)

      throw new UnknownErrorException()
    }
  }

  /**
   * Endpoint that verifies if the SMS code entered by the user is valid.
   * If valid, the user's phone number is updated in the database, allowing
   * them to proceed with the profile update on the frontend.
   */
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

      consoleError(error)

      throw new UnknownErrorException()
    }
  }

  /**
   * Endpoint that updates the user's information. If the user's phone number is different
   * from the previous one, the user will be required to confirm that the phone number
   * belongs to them using a code received via SMS. After confirming the code and calling
   * this endpoint again, the data can be updated.
   */
  @UseGuards(UserGuard)
  @Patch()
  async updateUser(@Req() req: SignedInRequest, @Body() dto: UpdateUserDto) {
    const user = req.user

    if (dto.phone && user.phone !== dto.phone) {
      try {
        await this.verifyService.sendCode(dto.phone)

        return HttpResponse.createBody({ id: 'code_sent' })
      } catch (error) {
        consoleError(error)

        throw new UnknownErrorException()
      }
    }

    const recentlyActivated = !user.isActive

    req.user.isActive = true

    await this.service.updateUser(req.user, dto)

    if (recentlyActivated) this.dailySummaryService.prepareAndSend(req.user)

    return HttpResponse.createBody({ recentlyActivated })
  }

  @UseGuards(UserGuard)
  @Delete()
  async deleteUser(@Req() req: SignedInRequest) {
    const user = req.user

    try {
      await this.nylasService.deleteGrant(user.grantId)

      await this.service.deleteUser(user)
    } catch (error) {
      consoleError(error)

      throw new UnknownErrorException()
    }

    return HttpResponse.createBody({})
  }
}

import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { httpCustomExceptionResponse } from '#common/utils/http-custom-exception-response.util.js'
import { UserService } from './user.service.js'
import { CodeDto } from '#api/user/dtos/code.dto.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { User } from '#db/entities/user.entity.js'
import { UpdateUserDto } from './dtos/update-user.dto.js'
import { UserGuard } from './guards/user.guard.js'
import { SignedInRequest } from '#common/utils/signed-in-request.util.js'

@Controller('api/user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly nylasService: NylasService,
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
      return httpCustomExceptionResponse(error)
    }
  }

  @UseGuards(UserGuard)
  @Patch()
  async updateUser(@Req() req: SignedInRequest, @Body() dto: UpdateUserDto) {
    await this.service.updateUser(req.user, dto)

    return HttpResponse.createBody({})
  }
}

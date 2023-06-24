import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials-dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<string> {
    return this.authService.login(credentials.username, credentials.password).then((user) => JSON.stringify(user, null, 2));
  }

  @Post('register')
  async register(@Body() credentials: CredentialsDto): Promise<string> {
    return this.authService.register(credentials.username, credentials.password).then((user) => JSON.stringify(user, null, 2));
  }
}
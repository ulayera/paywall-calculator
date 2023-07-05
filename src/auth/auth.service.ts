import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/data/user.entity';
import { UserStatus } from '../domain/enum/user-status';
import { Repository } from 'typeorm';
import { TokenDto } from './token-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<TokenDto> {
    if (!username || !pass) {
      throw new BadRequestException('Username and password are required');
    }
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    return { access_token: this.jwtService.sign({ username }) };
  }

  async register(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    let user = new User();
    user.username = username;
    user.password = password;
    user.status = UserStatus.ACTIVE;
    user = await this.usersRepository.save(user);
    return user != null;
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register') 
  @ApiOperation({ summary: 'Реєстрація нового користувача' }) 
  create(@Body() createAuthDto: CreateAuthDto) {
    
    return this.authService.create(createAuthDto);
  }
}

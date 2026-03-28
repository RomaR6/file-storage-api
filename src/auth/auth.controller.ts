import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'; 
import { JwtAuthGuard } from './jwt-auth.guard'; 

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вхід у систему' })
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  } 

  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth() 
  @Get('profile')
  @ApiOperation({ summary: 'Отримання профілю поточного юзера' })
  getProfile(@Request() req) {
    
    return req.user;
  }
}
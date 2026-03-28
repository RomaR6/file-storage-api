import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
    private jwtService: JwtService,
) {}


async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    
    const salt = await bcrypt.genSalt();
    
    
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = this.userRepository.create({
    email,
    password: hashedPassword,
    });

    return await this.userRepository.save(user);
    
}

async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    
    const user = await this.userRepository.findOne({ where: { email } });

    
    if (!user) {
    throw new UnauthorizedException('Невірний email або пароль');
    }
    
    
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    const payload = { sub: user.id, email: user.email };

    if (!isPasswordMatching) {
    throw new UnauthorizedException('Невірний email або пароль');
    }

    
    return {
    access_token: await this.jwtService.signAsync(payload),
    message: 'Успішний вхід',
    userId: user.id,
    email: user.email,
    };
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
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
}

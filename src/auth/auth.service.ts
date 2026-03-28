import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
) {}


async create(dto: CreateAuthDto) {
    const user = this.userRepository.create(dto); 
    return await this.userRepository.save(user); 
}
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty({ 
    example: 'user@example.com', 
    description: 'Електронна пошта' 
})
email: string;

@ApiProperty({ 
    example: 'password123', 
    description: 'Пароль користувача' 
})
password: string;
}
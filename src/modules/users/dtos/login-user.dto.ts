import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    name: 'email',
    required: true 
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    name: 'password',
    required: true  , 
    example: "23DA#adfa"
  })
  @IsNotEmpty()
  password: string;
}
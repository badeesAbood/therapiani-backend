import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    name: 'email',
    required: true 
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    name: 'password',
    required: true
  })
  @IsNotEmpty()
  password: string;


  @ApiProperty({
    name: 'name',
    required: true 
  })
  @IsNotEmpty()
  name: string;
}
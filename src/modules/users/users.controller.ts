import { Body,Get ,  Controller, Delete, Patch, Post,  Param, ParseIntPipe, UseGuards , Req } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUsertDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { LocalGuard } from "src/auth/guards/local.guard";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { GetProfileDto } from "./dtos/get-profile.dto";
import { Request } from "express";


@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.registerUser(createUserDto);
  }

  @Get('me') 
  me(@Req() req : Request) :Promise<GetProfileDto> {
    return this.usersService.myProfile(req.headers.authorization) ; 
  }


  @Delete(':id')
  deleteUser(@Param('id' , ParseIntPipe) id : number ): Promise<string>{
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id' , ParseIntPipe) id: number  ,@Body() updateUserDto: UpdateUsertDto) : Promise<User> {
    return this.usersService.updateUser(id , updateUserDto);
  }
}

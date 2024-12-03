import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { LoginResponse } from "src/modules/users/interfaces/users-login.interface";
import { UsersService } from "src/modules/users/users.service";



@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string , password: string ): Promise<User> {
    return  await this.userService.validateUser(email , password) ;
}

async login(user: User ) : Promise<LoginResponse> {
  return await this.userService.loginUser(user) ; 
}

}

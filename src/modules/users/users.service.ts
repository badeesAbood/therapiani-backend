import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/core/services/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { UpdateUsertDto } from "./dtos/update-user.dto";
import { LoginResponse, UserPayload } from "./interfaces/users-login.interface";
import { JwtService } from "@nestjs/jwt";
import { GetProfileResponse } from "./dtos/get-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password_hash: await hash(createUserDto.password, 10),
        },
      });

      delete newUser.password_hash;
      return newUser;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Email already registered");
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }


  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    // check if user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // check if password is correct by comparing it with the hashed password in the database
    if (!(await compare(password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user ; 
  }


  async loginUser(user: User): Promise<LoginResponse> {
    try {
      // find user by email
      const accessToken = await this.accessToken({ email : user.email , name: user.name , sub: user.id}); 

      const refreshToken = await this.refreshToken({ email : user.email , name: user.name , sub: user.id}); 

      return {
        access_token: accessToken , 
        refresh_token:  refreshToken , 
      };

    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }


  // handling tokens 
  async accessToken(payload : UserPayload) : Promise<string> {
    return await this.jwtService.signAsync(payload , {expiresIn: '30m' , secret : process.env.JWT_ACCESS_SECRET}) ; 
  }

  async refreshToken(payload : UserPayload) : Promise<string> {
    return await this.jwtService.signAsync(payload , {expiresIn: '7d' , secret: process.env.JWT_REFRESH_SECRET}) ; 
  }



  async updateUser(id: number, updateUserDto: UpdateUsertDto): Promise<User> {
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id } });
      const updatedUser = await this.prisma.user.update({
        data: {
          updated_at: new Date(Date.now()),
          ...updateUserDto,
        },
        where: { id },
      });

      delete updatedUser.password_hash;

      return updatedUser;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // check if email already registered and throw error
      if (error.code === "P2002") {
        throw new ConflictException("Email already registered");
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async deleteUser(id: number): Promise<string> {
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id } });
      const deletedUser = await this.prisma.user.delete({ where: { id } });

      return `User with id ${deletedUser.id} deleted `;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }


  async myProfile(token: string ) : Promise<GetProfileResponse> {
    try {

      const payload = this.jwtService.decode(token.split(' ')[1]) as UserPayload
      const user = await this.prisma.user.findUniqueOrThrow({where: {id: payload.sub}}); 
      return user ; 
    }catch (error){
      if (error.code === "P2025") {
        throw new NotFoundException(`User  not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}

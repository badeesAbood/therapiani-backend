import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req : Request) {
        return req.user ; 
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
            console.log("Inside authController status method");
            console.log(req.user);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    refresh(@Req() req: Request){
        return req.user ;  
    }

}

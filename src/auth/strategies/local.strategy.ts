import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
constructor(private authService: AuthService){
    super();
}

 async validate(username: string, password: string) : Promise<any>{
    const user  =  await this.authService.validate(username , password);
    
    return this.authService.login(user);
}


}
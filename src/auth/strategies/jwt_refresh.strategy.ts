import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: "jwtrefreshtoken",
    });
  }


  // async validate(payload: any) {
  //   if(!payload.userName || !payload.id) throw new UnauthorizedException(); 
  //   // const accessToken = this.authService.accessToken(payload.userName  , payload.id , payload.permessions) ; 
  // return accessToken ; 
  // }
}

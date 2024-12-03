import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/modules/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt_refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy , JwtRefreshStrategy , JwtStrategy],
})
export class AuthModule {}
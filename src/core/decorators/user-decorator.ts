import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "src/modules/users/interfaces/users-login.interface";


export const UserDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user as UserPayload;
    },
) ;
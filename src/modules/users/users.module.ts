import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/core/services/prisma.service";

@Module({
  providers: [UsersService , PrismaService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

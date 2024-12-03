import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaService } from 'src/core/services/prisma.service';
@Module({
    providers: [RemindersService, PrismaService],
    controllers:[RemindersController] ,
    exports: [RemindersService]
})
export class RemindersModule {}

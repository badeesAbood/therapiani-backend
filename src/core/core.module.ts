
import {Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { MedicationsModule } from 'src/modules/medications/medications.module';
import { RemindersModule } from 'src/modules/reminders/reminders.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ProgresslogsModule } from 'src/modules/progresslogs/progresslogs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MedicationsModule,
    RemindersModule,
    ProgresslogsModule ,
    JwtModule.register({global: true}),
],
exports: [PrismaService] ,
providers: [PrismaService ,JwtStrategy]
})
export class CoreModule {}
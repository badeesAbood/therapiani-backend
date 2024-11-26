
import {Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { MedicationsModule } from 'src/modules/medications/medications.module';
import { RemindersModule } from 'src/modules/reminders/reminders.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    MedicationsModule,
    RemindersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'bad@@##services',
      signOptions: { expiresIn: '1h' },
    }),
],
exports: [PrismaService] ,
providers: [PrismaService ,JwtStrategy]
})
export class CoreModule {}
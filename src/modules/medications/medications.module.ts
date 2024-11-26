import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { PrismaService } from '../../core/services/prisma.service';

@Module({
    controllers: [MedicationsController],
    providers : [MedicationsService, PrismaService],
})
export class MedicationsModule {}

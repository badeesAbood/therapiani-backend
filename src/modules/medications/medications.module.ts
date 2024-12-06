import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { PrismaService } from '../../core/services/prisma.service';
import { RemindersModule } from '../reminders/reminders.module';
import { InventoriesModule } from '../inventories/inventories.module';
import { ProgresslogsService } from '../progresslogs/progresslogs.service';
import { ProgresslogsModule } from '../progresslogs/progresslogs.module';

@Module({
    imports: [RemindersModule , InventoriesModule , ProgresslogsModule] ,
    controllers: [MedicationsController],
    providers : [MedicationsService, PrismaService],
})
export class MedicationsModule {}

import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/services/prisma.service";
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';

@Module({
    controllers: [InventoriesController],
    providers : [InventoriesService, PrismaService],
    exports: [InventoriesService]
})
export class InventoriesModule {}
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateInventroyDto } from './dtos/create-inventory.dto';
import { Inventory } from '@prisma/client';

@Injectable()
export class InventoriesService {

    constructor (private prisma: PrismaService){}

    async createInventory(inventoriesDto: CreateInventroyDto[] , medId: number , userId: number): Promise<Inventory[]>{
        try {

            inventoriesDto.forEach(dto => {
                dto.medication_id = medId;
                dto.user_id = userId;
              });
              
            const inventories = await this.prisma.inventory.createManyAndReturn({data : inventoriesDto});

            return inventories ; 

        }catch(error) {
            throw new HttpException(error , 500)
        }
    }


}

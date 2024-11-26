import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma.service';
import { CreateMedicationDto } from './dtos/create-medication.dto';
import { Medication } from '@prisma/client';
import { UpdateMedicationDto } from './dtos/update-medication.dts';
import { FetchMedicationsDto } from './dtos/fetch-medications.dto';

@Injectable()
export class MedicationsService {
constructor(private prisma:PrismaService){}

async createMedication(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    try {
        const newMed = await this.prisma.medication.create({
            data: {
                created_at : new Date(Date.now()) , 
                updated_at : new Date(Date.now()) , 
                ...createMedicationDto 
            }
        })

        return newMed ;

    }catch(error) {
        if (error.code === "P2002") {
            throw new ConflictException("Email already registered");
          }
          throw new HttpException(error, 500);
    }      

}

async updateMedication(id: number , updateMedicationDto: UpdateMedicationDto): Promise<Medication> {
    try {
        const updatedMed = await this.prisma.medication.update({data: {
            updated_at : new Date(Date.now()) , 
            ...updateMedicationDto
        } , where: {id}}) ; 

        return updatedMed ; 

    }catch(error) {
        if (error.code === "P2025") {
            throw new NotFoundException(`Medication with id ${id} not found`);
          }
          throw new HttpException(error, 500);

    }
}


async getMedication(id: number) : Promise<Medication> {
    try {
        const med = this.prisma.medication.findUniqueOrThrow({where: {id}});
        return med  ;

    }catch(error) {
        if (error.code === "P2025") {
            throw new NotFoundException(`Medication with id ${id} not found`);
          }
          throw new HttpException(error, 500);

    }
}


async fetchAllMedications( fetchMedicationsDto: FetchMedicationsDto) : Promise<Medication[]> {
    try {
        await this.prisma.medication.findUniqueOrThrow({where: { user_id: fetchMedicationsDto.user_id}});
        const meds = await this.prisma.medication.findMany({where: fetchMedicationsDto});

        return meds ; 
    }catch(error) {
        if (error.code === "P2025") {
            throw new NotFoundException(`Medication with id ${fetchMedicationsDto.user_id} not found`);
          }
          throw new HttpException(error, 500);

    }
}


async deleteMedication(id: number): Promise<string> {
    try {
        await this.prisma.medication.findUniqueOrThrow({ where: { id } });
        const deletedUser = await this.prisma.medication.delete({ where: { id } });
  
        return `Medication with id ${deletedUser.id} deleted `;
      } catch (error) {
        if (error.code === "P2025") {
          throw new NotFoundException(`Medication with id ${id} not found`);
        }
  
        // throw error if any
        throw new HttpException(error, 500);
      }
}
}

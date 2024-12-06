import { ConflictException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../core/services/prisma.service";
import { CreateMedicationModel } from "./dtos/create-medication.dto";
import { Medication } from "@prisma/client";
import { UpdateMedicationDto } from "./dtos/update-medication.dts";
import { FetchMedicationsDto } from "./dtos/fetch-medications.dto";
import { RemindersService } from "../reminders/reminders.service";
import { CreateReminderDto } from "../reminders/dtos/create-reminder.dto";
import { CreateInventroyDto } from "../inventories/dtos/create-inventory.dto";
import { InventoriesService } from "../inventories/inventories.service";
import { ProgresslogsService } from "../progresslogs/progresslogs.service";
import { CreateProgressLogDto } from "../progresslogs/dtos/create-progresslog.dto";

@Injectable()
export class MedicationsService {
  constructor(
    private prisma: PrismaService,
    private reminderService: RemindersService,
    private inventoryService: InventoriesService,
    private progressLogService: ProgresslogsService,
  ) {}

  async createMedication(
    createMedicationDto: CreateMedicationModel,
    createReminderDto: CreateReminderDto[],
    createInventoryDto: CreateInventroyDto[],
    createProgressLogDto: CreateProgressLogDto,
  ): Promise<Medication> {
    try {
      const newMed = await this.prisma.medication.create({
        data: {
          ...createMedicationDto,
        },
      });

      await Promise.all([
        this.reminderService.createReminders(createReminderDto, newMed.id, createMedicationDto.user_id),

        this.inventoryService.createInventory(createInventoryDto, newMed.id, createMedicationDto.user_id),

        this.progressLogService.createLog(createProgressLogDto, newMed.id, createMedicationDto.user_id),
      ]);

      return newMed;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Medication already exists");
      }
      throw new HttpException(error, 500);
    }
  }

  async updateMedication(id: number, updateMedicationDto: UpdateMedicationDto): Promise<Medication> {
    try {
      const updatedMed = await this.prisma.medication.update({
        data: {
          updated_at: new Date(Date.now()),
          ...updateMedicationDto,
        },
        where: { id },
      });

      return updatedMed;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Medication with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }

  async getMedication(id: number, userId: number): Promise<Medication[]> {
    try {
      const meds = this.prisma.medication.findMany({ where: { AND: [
        {id: id } , 
        {user_id : userId}
      ] }, include: { inventory: true, reminder: true } });
      return meds;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Medication with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }

  async fetchAllMedications(fetchMedicationsDto: FetchMedicationsDto): Promise<any> {
    try {
      await this.prisma.medication.findFirstOrThrow({ where: { user_id: fetchMedicationsDto.user_id } });
      const meds: Medication[] = await this.prisma.medication.findMany({
        where: fetchMedicationsDto,
        include: {
          reminder: true,
          inventory: true,
        },
      });

      return meds;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Medication with userID ${fetchMedicationsDto.user_id} not found`);
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

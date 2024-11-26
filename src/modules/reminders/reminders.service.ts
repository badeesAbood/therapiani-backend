import { HttpException, Injectable } from "@nestjs/common";
import { Reminder } from "@prisma/client";
import { PrismaService } from "src/core/services/prisma.service";
import { CreateReminderDto } from "./dtos/create-reminder.dto";
import { UpdateReminderDto } from "./dtos/update-reminder.dto";
import { FetchRemindersDto } from "./dtos/fetch-reminders.dto";

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async createReminder(createReminderDto: CreateReminderDto): Promise<Reminder> {
    try {
      await this.prisma.medication.findUniqueOrThrow({ where: { id: createReminderDto.medication_id } });

      await this.prisma.user.findUniqueOrThrow({ where: { id: createReminderDto.user_id } });

      const newReminder = await this.prisma.reminder.create({
        data: {
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          ...createReminderDto,
        },
      });

      return newReminder;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async updateReminder(id: number, updateReminderDto: UpdateReminderDto): Promise<Reminder> {
    try {
      await this.prisma.reminder.findUniqueOrThrow({ where: { id } });

      const updatedReminder = await this.prisma.reminder.update({
        data: {
          updated_at: new Date(Date.now()),
          ...updateReminderDto,
        },
        where: { id },
      });
      return updatedReminder;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async deleteReminder(id: number): Promise<string> {
    try {
      await this.prisma.reminder.findUniqueOrThrow({ where: { id } });

      await this.prisma.reminder.delete({ where: { id } });

      return `Reminder with the id ${id} was deleted`;
    } catch (error) {
    }
  }

  async getAllReminders(fetchRemindersDto: FetchRemindersDto): Promise<Reminder[]> {
    try {
      const reminders = await this.prisma.reminder.findMany({ where: { user_id: fetchRemindersDto.user_id, medication_id: fetchRemindersDto.medication_id } });

      return reminders;
    } catch (error) {
        throw new HttpException(error, 500);
    }
  }


  async getReminder(id: number) : Promise<Reminder> {
    try {
        const reminder = await this.prisma.reminder.findUniqueOrThrow({where: {id}});
  
        return reminder;

      } catch (error) {
          throw new HttpException(error, 500);
      }
  }
}

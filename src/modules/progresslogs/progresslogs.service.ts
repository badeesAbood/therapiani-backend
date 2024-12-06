import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/prisma.service";
import { CreateProgressLogDto } from "./dtos/create-progresslog.dto";
import { ProgressLog } from "@prisma/client";

@Injectable()
export class ProgresslogsService {
  constructor(private prisma: PrismaService) {}

  async createLog(dto: CreateProgressLogDto, medId: number, userId: number): Promise<ProgressLog> {
    try {
      dto.medication_id = medId;
      dto.user_id = userId;

      const log = await this.prisma.progressLog.create({
        data: dto,
      });

      return log;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async fetchLogs(): Promise<ProgressLog[]> {
    try {
      const logs = await this.prisma.progressLog.findMany();
      return logs;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}

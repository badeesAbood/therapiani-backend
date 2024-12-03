import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateMedicationDto, CreateMedRequest } from "./dtos/create-medication.dto";
import { MedicationsService } from "./medications.service";
import { UserDecorator } from "src/core/decorators/user-decorator";
import { UserPayload } from "../users/interfaces/users-login.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { CreateReminderDto } from "../reminders/dtos/create-reminder.dto";
import { TransformReminderDtoPipe } from "../reminders/pipes/transform-validator";

@Controller("medications")
export class MedicationsController {
  constructor(private medService: MedicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async createMedication(
   @Body() request :CreateMedRequest ,
    @UserDecorator() user: UserPayload,
  ): Promise<any> {
    return this.medService.createMedication({ user_id: user.sub, ...request.med }, request.reminders , request.inventories);
  }
}

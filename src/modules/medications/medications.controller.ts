import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {  CreateMedRequest } from "./dtos/create-medication.dto";
import { MedicationsService } from "./medications.service";
import { UserDecorator } from "src/core/decorators/user-decorator";
import { UserPayload } from "../users/interfaces/users-login.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";


@UseGuards(JwtAuthGuard)
@Controller("medications")
export class MedicationsController {
  constructor(private medService: MedicationsService) {}

  @Post("create")
  async createMedication(@Body() request: CreateMedRequest, @UserDecorator() user: UserPayload): Promise<any> {
    return this.medService.createMedication({ user_id: user.sub, ...request.med }, request.reminders, request.inventories, request.log);
  }

  @Get()
  async fetchMedications( @UserDecorator() user: UserPayload) {
    return  await this.medService.fetchAllMedications({user_id: user.sub}) ; 
  }

  @Get(':id')
  async fetchsepsMed(@Param('id') id :  number ,@UserDecorator() user: UserPayload) {
    return await this.medService.getMedication(+id , user.sub); 
  }

}

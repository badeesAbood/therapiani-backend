import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dtos/create-reminder.dto';
import { Reminder } from '@prisma/client';
import { UpdateReminderDto } from './dtos/update-reminder.dto';
import { FetchRemindersDto } from './dtos/fetch-reminders.dto';

@Controller('reminders')
export class RemindersController {
    constructor(private remindersService: RemindersService){}



    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number  , @Body() updateReminderDto: UpdateReminderDto) : Promise<Reminder> {
        return this.remindersService.updateReminder(id , updateReminderDto);
    }


    @Delete(':id') 
    async delete(@Param('id', ParseIntPipe) id: number) : Promise<string> {
        return this.remindersService.deleteReminder(id)
    }

    @Get(':id') 
    async getReminder(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
        return this.remindersService.getReminder(id) ; 
    }

    @Get()
    async fetchReminders(@Body() fetchRemindersDto: FetchRemindersDto) : Promise<Reminder[]> {
        return this.remindersService.getAllReminders(fetchRemindersDto) ;
    }
}

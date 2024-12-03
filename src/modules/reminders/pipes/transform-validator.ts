import { PipeTransform, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateReminderDto } from '../dtos/create-reminder.dto';

@Injectable()
export class TransformReminderDtoPipe implements PipeTransform {
  transform(value: any) {
    // Ensure the value is an array of objects
    if (Array.isArray(value)) {
      return value.map((item) => plainToClass(CreateReminderDto, item));
    }
    // If not an array, return the value as is
    return plainToClass(CreateReminderDto, value);
  }
}
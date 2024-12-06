import { plainToClass, Transform } from "class-transformer";
import { isISO8601 } from "class-validator";
import { CreateInventroyDto } from "src/modules/inventories/dtos/create-inventory.dto";
import { CreateProgressLogDto } from "src/modules/progresslogs/dtos/create-progresslog.dto";
import { CreateReminderDto } from "src/modules/reminders/dtos/create-reminder.dto";


export class CreateMedicationDto {
    description: string ;
    dose: string ;
    frequency: string ;

    @Transform(({ value }) => {
        const isValidDate = isISO8601(value, { strict: true, strictSeparator: true });
        if (!isValidDate) {
          throw new Error(`Property "start_date" should be a valid ISO8601 date string`);
        }
        return new Date(value);
      })
    start_at: Date ;


    @Transform(({ value }) => {
        const isValidDate = isISO8601(value, { strict: true, strictSeparator: true });
        if (!isValidDate) {
          throw new Error(`Property "end_date" should be a valid ISO8601 date string`);
        }
        return new Date(value);
      })
    end_at: Date ;
}


export class CreateMedicationModel extends CreateMedicationDto{
    user_id : number  ;
}



export class CreateMedRequest {

    @Transform((value) =>  {
        // Ensure the value is an array of objects
        if (Array.isArray(value)) {
          return value.map((item) => plainToClass(CreateReminderDto, item));
        }
        // If not an array, return the value as is
        return plainToClass(CreateReminderDto, value);
      }
    )
    reminders: CreateReminderDto[]  ;
    med: CreateMedicationDto 

    @Transform((value) =>  {
        // Ensure the value is an array of objects
        if (Array.isArray(value)) {
          return value.map((item) => plainToClass(CreateInventroyDto, item));
        }
        // If not an array, return the value as is
        return plainToClass(CreateInventroyDto, value);
      }
    )
    inventories: CreateInventroyDto[] ; 

    log: CreateProgressLogDto ; 
}
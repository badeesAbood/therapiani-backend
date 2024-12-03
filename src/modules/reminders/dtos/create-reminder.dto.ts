import { Transform } from "class-transformer";
import { isISO8601 } from "class-validator";


export class CreateReminderDto {
    
    @Transform(({ value }) => {
        const isValidDate = isISO8601(value, { strict: true, strictSeparator: true });
        if (!isValidDate) {
          throw new Error(`Property "time" should be a valid ISO8601 date string`);
        }
        return new Date(value);
      })
    time: Date ;

    
    medication_id : number ; 
    user_id : number ; 
    status: string ; 
    repeat: string ; 
   
}
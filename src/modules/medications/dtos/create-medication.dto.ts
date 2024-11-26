

export class CreateMedicationDto {
    user_id : number  ;
    name: string ;
    description: string ;
    dose: string ;
    frequency: string ;
    start_at: Date ;
    end_at: Date ;
}
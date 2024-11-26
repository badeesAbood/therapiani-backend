import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";



export class GetProfileDto extends PartialType(CreateUserDto) {

}
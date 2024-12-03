import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";



export class GetProfileResponse extends PartialType(CreateUserDto) {

}
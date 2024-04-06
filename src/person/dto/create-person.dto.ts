import {IsInt, IsNotEmpty, IsString} from "class-validator"

export class CreatePersonDto {
  @IsNotEmpty({message:'Name is required'})
  @IsString()
  name:string
  @IsNotEmpty({message:'Age is required'})
  @IsInt()
  age:number
}

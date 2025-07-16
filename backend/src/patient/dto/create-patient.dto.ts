import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: string;
}

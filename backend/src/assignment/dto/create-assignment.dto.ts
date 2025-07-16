import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  patientId: number;

  @IsNotEmpty()
  medicationId: number;

  @IsDateString()
  startDate: string;

  @IsNumber()
  numberOfDays: number;
}

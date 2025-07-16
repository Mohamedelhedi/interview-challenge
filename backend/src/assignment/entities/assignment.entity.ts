import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Medication } from '../../medication/entities/medication.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, patient => patient.assignments, { eager: true })
  patient: Patient;

  @ManyToOne(() => Medication, medication => medication.assignments, { eager: true })
  medication: Medication;

  @Column()
  startDate: string; // ISO string, e.g. "2025-07-13"

  @Column()
  numberOfDays: number;
}
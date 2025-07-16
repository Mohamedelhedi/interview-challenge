import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Medication } from '../medication/entities/medication.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async create(dto: CreateAssignmentDto): Promise<Assignment> {
    const patient = await this.patientRepository.findOneBy({ id: dto.patientId });
    const medication = await this.medicationRepository.findOneBy({ id: dto.medicationId });
    if (!patient) throw new NotFoundException('Patient not found');
    if (!medication) throw new NotFoundException('Medication not found');

    const assignment = this.assignmentRepository.create({
      patient,
      medication,
      startDate: dto.startDate,
      numberOfDays: dto.numberOfDays,
    });
    return this.assignmentRepository.save(assignment);
  }

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find();
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    return assignment;
  }

  async update(id: number, dto: UpdateAssignmentDto): Promise<Assignment> {
    const assignment = await this.findOne(id);
    // if (dto.patientId) {
    //   assignment.patient = await this.patientRepository.findOneBy({ id: dto.patientId });
    // }
    // if (dto.medicationId) {
    //   assignment.medication = await this.medicationRepository.findOneBy({ id: dto.medicationId });
    // }
    if (dto.startDate) assignment.startDate = dto.startDate;
    if (dto.numberOfDays) assignment.numberOfDays = dto.numberOfDays;
    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }

  // ✅ calculate remaining days
  calculateRemainingDays(assignment: Assignment): number {
    const start = new Date(assignment.startDate);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = assignment.numberOfDays - diffDays;
    return remaining > 0 ? remaining : 0;
  }

  async findAllWithRemainingDays() {
    const assignments = await this.assignmentRepository.find();
    return assignments.map(a => ({
      ...a,
      remainingDays: this.calculateRemainingDays(a),
    }));
  }
}

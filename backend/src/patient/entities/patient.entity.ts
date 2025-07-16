

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'date' })
    dateOfBirth: string;

    @OneToMany(() => Assignment, assignment => assignment.patient)
    assignments: Assignment[];
}

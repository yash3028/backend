import { Entity,PrimaryGeneratedColumn,Column, Collection } from "typeorm";

@Entity()

export class Software{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('text')
    description!: string;

    @Column('simple-array')
    accesslevels!: string[];

}
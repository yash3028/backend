import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

export type accesstype = 'Read' | 'Write' | 'Admin'
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected'
@Entity()
export class Request{
    @PrimaryGeneratedColumn()
    id!: number
    @ManyToOne(()=>User)
    user!: User
    @ManyToOne(()=>Software)
    software!:Software
    @Column()
    accessType!:  accesstype
    @Column('text')
    reason!: string
    @Column()
    status!: RequestStatus
    
}
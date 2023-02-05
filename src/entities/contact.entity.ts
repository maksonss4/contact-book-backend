import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    first_name: string

    @Column({nullable: true})
    last_name: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => User, (user) => user.contacts)
    user:User
}
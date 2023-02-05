import {Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, } from "typeorm"
import { Contact } from "./contact.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({unique: true})
    email: string

    @Column()
    phone_number: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    password: string

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]
}
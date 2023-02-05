import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from "typeorm"

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

    @Column()
    password: string
}
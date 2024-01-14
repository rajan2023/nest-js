import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email', 'phone'])
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    middleName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string
}
export default User;
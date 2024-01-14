import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import AppValidationException from 'src/exception/appValidationError.exception';

@Injectable()
export class UserService {
    constructor(private readonly _userRepository: Repository<User>) { }

    async getAllUser(): Promise<User[]> {
        return await this._userRepository.find({
            select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                email: true
            }
        });
    }
    async findUserByEmail(email: string): Promise<User> {
        return await this._userRepository.findOneBy({ email })
    }

    async findUserById(id: number): Promise<User> {
        return await this._userRepository.findOneBy({ id })
    }

    /**
     * Create a new user.
     * 
     * @param createUserDto - The data for creating a new user.
     * @returns The created user.
     * @throws {AppValidationException} If the email already exists.
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Check if the user already exists by email
        const checkUserExist = await this.findUserByEmail(createUserDto?.email);
        if (checkUserExist) {
            throw new AppValidationException({
                email: "Email already exists. Please use unique one"
            });
        }

        // Create a new user object
        const user: User = this._userRepository.create({
            ...createUserDto
        });

        // Save the user to the database
        return await this._userRepository.save(user);
    }


    /**
     * Update a user by their ID.
     *
     * @param id - The ID of the user to update.
     * @param updateUserDto - The data to update the user with.
     * @returns The updated user.
     * @throws AppValidationException if the user is not found.
     */
    async updateUser(id: number, updateUserDto: CreateUserDto): Promise<User> {
        // Remove email address and password from update
        delete updateUserDto.email;
        delete updateUserDto.password;

        // Find the user by their ID
        const user = await this.findUserById(id);

        // Throw an exception if user is not found
        if (!user) {
            throw new AppValidationException({
                id: "User not found"
            });
        }

        // Save the updated user
        await this._userRepository.update(id, { ...user, ...updateUserDto });
        return await this.findUserByEmail(updateUserDto?.email);
    }

    async deleteUser(id: number): Promise<void> {
        // Find the user by their ID
        const user = await this.findUserById(id);

        // Throw an exception if user is not found
        if (!user) {
            throw new AppValidationException({
                id: "User not found"
            });
        }

        // delete user
        await this._userRepository.delete(id);
    }
}

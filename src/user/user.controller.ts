import User from './entity/user.entity';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this._userService.createUser(createUserDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this._userService.findUserById(id);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this._userService.getAllUser()
    }

    @Patch()
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return this._userService.updateUser(id, updateUserDto);
    }

    @Delete()
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._userService.deleteUser(id);
    }
}

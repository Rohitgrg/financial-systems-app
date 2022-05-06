import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Res} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly userService : UsersService){}

    @Get()
    async list(@Res() response) {
        const users: User[] = await this.userService.listAllUsers();
        return response.status(201).json(
            users
        )
    }

    @Post()
    async create(@Res() response, @Body() createUserDto: CreateUserDto){
        const user = await this.userService.createUser();
        return response.status(201).json(
            user
        )
    }

    @Put(':id')
    async update(@Res() response, @Body() updateUserDto: CreateUserDto, @Param('id') userId) {
        const result: UpdateResult = await this.userService.updateUser(userId,updateUserDto);
        return response.status(201).json(
            result
        )
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') userId){
        const result: DeleteResult = await this.userService.deleteUser(userId);
        return response.status(201).json(
            result
        )
        // return 'users deleted';
    }

    @Get(':id')
    async findOne(@Res() response, @Param('id') userId){
        try {
            const user: User = await this.userService.findOneUser(userId);
            return response.status(201).json(
                user
            )
        } catch (error) {
            Logger.log(error);
            return response.status(500).json(
                error.message
            )
        }
        
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly userService : UsersService){}


    @Get()
    list(): User[] {
        return this.userService.listAllUsers();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): string {
        return `Name:${createUserDto.firstName}`;
    }

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Param('id') userId): string {
        return 'user updated';
    }

    @Delete(':id')
    delete(@Param('id') userId): string{
        return 'users deleted';
    }

    @Get(':id')
    findOne(@Param('id') userId): User {
        return this.userService.findOneUser(userId);
    }
}

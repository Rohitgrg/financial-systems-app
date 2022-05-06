import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    @Get()
    list(): string {
        return 'all users';
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
    findOne(@Param('id') userId): number {
        return userId;
    }
}

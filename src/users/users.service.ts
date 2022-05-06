import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    private readonly fakeUsers : User[] = [{
        id: "1234",
        firstName: "Rohit",
        lastName:"Gurung",
        balance: 1200
    },
    {
        id: "12",
        firstName: "Rohit-2",
        lastName:"Gurung",
        balance: 1200
    }]

    createUser(){};
    listAllUsers() : User[] {
        return this.fakeUsers;
    };
    findOneUser(userId: string): User{
        return this.fakeUsers.find(user => user.id === userId)
    };
    updateUser(){};
    deleteUser(){};
}

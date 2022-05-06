import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private usersRepository: Repository<User> ){
    }

    // private readonly fakeUsers : User[] = [{
    //     id: "1234",
    //     firstName: "Rohit",
    //     lastName:"Gurung",
    //     balance: 1200
    // },
    // {
    //     id: "12",
    //     firstName: "Rohit-2",
    //     lastName:"Gurung",
    //     balance: 1200
    // }]

    createUser(): Promise<User> {
        const user = new User();
        user.firstName = "Rohit";
        user.lastName = "Gurung";
        return this.usersRepository.save(user);
    };

    listAllUsers() : Promise<User[]> {
        return this.usersRepository.find();
    };

    async findOneUser(userId: number): Promise<User>{
        const user : User = await this.usersRepository.findOne(userId);
        if(!user) throw new Error("User not found");
        
        return this.usersRepository.findOne(userId);
    };

    updateUser(userId: number, newUserData : CreateUserDto) : Promise<UpdateResult>{
        return getConnection()
        .createQueryBuilder()
        .update(User)
        .set(newUserData)
        .where("id = :id", { id: userId })
        .execute();
    };

    deleteUser(userId: number):Promise<DeleteResult>{
        return this.usersRepository.delete(userId);
    };
}

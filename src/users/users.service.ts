import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user_dto';

@Injectable()
export class UsersService {
    async findAll(): Promise<UserDto[]> {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return response.json();
    }

    async findOne(id: number): Promise<UserDto> {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return data;
    }
}

import { Controller, Post, Body, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  
    // Buscar usuario por email
    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<User> {
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    }
  
    // Buscar usuario por ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
      return this.usersService.findById(id);
    }
    
    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
  
  
  
  
}
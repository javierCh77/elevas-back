import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RolUsuario } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  celular: string;


  @Column({
    type: 'enum',
    enum: RolUsuario,
  })
  rol: RolUsuario;
}
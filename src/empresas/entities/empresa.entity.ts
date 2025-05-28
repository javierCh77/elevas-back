import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  cuit: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @OneToMany(() => Empleado, (empleado) => empleado.empresa)
  empleados: Empleado[];
  
  @OneToMany(() => Encuesta, (encuesta) => encuesta.empresa)
  encuestas: Encuesta[];
}

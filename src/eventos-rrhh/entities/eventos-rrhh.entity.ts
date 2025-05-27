import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Empleado } from "../../empleados/entities/empleado.entity";
import { User } from "../../users/entities/user.entity";

@Entity("eventos_rrhh")
export class EventoRRHH {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titulo: string;

  @Column("text", { nullable: true })
  descripcion?: string;

  @Column({
    type: "enum",
    enum: [
      "alta_empleado",
      "baja_empleado",
      "renovacion_contrato",
      "fin_periodo_prueba",
      "entrega_indumentaria",
      "licencia",
      "entrevista",
      "evaluacion",
      "capacitacion",
      "alerta_documental",
      "otro",
    ],
  })
  tipo: string;

  @Column({ type: "timestamp" })
  fechaInicio: Date;

  @Column({ type: "timestamp" })
  fechaFin: Date;

  @Column({
    type: "enum",
    enum: ["pendiente", "realizado", "cancelado"],
    default: "pendiente",
  })
  estado: "pendiente" | "realizado" | "cancelado";

  @ManyToOne(() => Empleado, { nullable: true, eager: true })
  empleado?: Empleado;

  @ManyToOne(() => User, { nullable: false, eager: true })
  creadoPor: User;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}

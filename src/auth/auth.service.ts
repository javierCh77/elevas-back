import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('🟡 Validando usuario con email:', email);
    const user = await this.userService.findByEmail(email.toLowerCase());
    // console.log('🟢 Resultado de búsqueda:', user);
    // console.log('Password ingresado:', pass);
    // console.log('Password guardado:', user?.password);
    // console.log('¿Coincide?', await bcrypt.compare(pass, user.password));

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    // console.log('🔴 Usuario no encontrado o contraseña incorrecta');
    return null;
  }

  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const { email, id, nombre, apellido, fotoPerfil, rol } = user;
    const payload = { email, sub: id, nombre, apellido, fotoPerfil, rol }; // Agregar los datos al payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    // ❌ No hashees acá
    return this.userService.create(createUserDto); // 👍 Ya hashea internamente
  }
}
import { Module } from '@nestjs/common';
import { InteligenciaTalentoService } from './inteligencia-talento.service';
import { InteligenciaTalentoController } from './inteligencia-talento.controller';

@Module({
  controllers: [InteligenciaTalentoController],
  providers: [InteligenciaTalentoService],
})
export class InteligenciaTalentoModule {}

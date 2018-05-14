import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {PreguntasFrecuentesController} from './PreguntasFrecuentes.Controller';
import {InicioController} from './Inicio.Controller';

@Module({
  imports: [],
  controllers: [AppController,PreguntasFrecuentesController,InicioController],
  components: [],
})
export class AppModule {}

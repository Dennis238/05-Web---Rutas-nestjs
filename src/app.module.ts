import {MiddlewaresConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {UsuarioController} from "./usuario.controller";
import {ParametrosController} from "./parametros.controller";
import {LogMiddleware} from "./log.middleware";
import {InicioController} from "./inicio.controller";
import {PreguntasFrecuentesController} from "./preguntasfrecuentes.controller";



@Module({
    imports: [ // OtrosModulos
    ],
    controllers: [ // Controladores
        AppController,
        UsuarioController,
        ParametrosController,
        InicioController,
        PreguntasFrecuentesController
    ],
    components: [],
})
export class AppModule implements NestModule {
    nombreAplicacion = 'Deber Dennis Veintimilla EPN';

    configure(consumer: MiddlewaresConsumer)
        : void {
        consumer
            .apply(LogMiddleware)
            .with(this.nombreAplicacion)
            .forRoutes(
                UsuarioController,
                AppController,
                ParametrosController,
                InicioController,
                PreguntasFrecuentesController
            )
        //.apply(OtroMiddleware)
        //.forRoutes(Otras rutas);
    }

}

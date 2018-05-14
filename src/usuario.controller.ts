import {Controller, Get, HttpCode, Post, Req, Res} from "@nestjs/common";
import Status = jest.Status;

// decorator
@Controller('Usuario')
export class UsuarioController {
    usuario = {
        nombre: 'Dennis',
        apellido: 'Veintimilla',
        edad: 21
    };

    usuarios = [];

    @HttpCode(202)
    @Get('mostrar')
    mostrarUsuario() {
        return this.usuario;
    }

    @Get('mostrarExpress')
    mostrarUsuarioExpress(
        @Req() request,
        @Res() response
    ) {
        return response
            .status(200)
            .send(this.usuarios);
    }

    @Post('crearUsuario')
    crearUsuario(
        @Req() request,
        @Res() response
    ) {
        const nuevoUsuario = {
            nombre: request.query.nombre,
            apellido: request.query.apellido,
            edad: request.query.edad
        };

        this.usuarios.push(nuevoUsuario);

        return response
            .status(201)
            .send(nuevoUsuario);
    }


}
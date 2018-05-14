import {Controller, Post, Req, Res} from '@nestjs/common';

@Controller()
export class PreguntasFrecuentesController{
    preguntasFrecuentes=[];
    @Post('') preguntas(
        @Req() request,
        @Res() response
    ){
        const preguntasfrecuentes=[];


    }

}
//bibliografia
//https://desarrolloweb.com/articulos/lectura-archivos-nodejs.html
//https://docs.nestjs.com/controllers

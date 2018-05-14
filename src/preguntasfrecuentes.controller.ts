import {Controller, Get, Post, Req, Res} from "@nestjs/common";

const fs =require('fs');
let preguntasHtml=fs.readFileSync(__dirname+'/html/preguntasFrecuentes.html', 'utf8');
@Controller()
export class PreguntasFrecuentesController {

    preguntas_frecuentes=[];
    @Post('preguntasfreq')
    anadirPreguntas(@Req() request, @Res() response){
        const parametrosConsulta=request.query;
        this.preguntas_frecuentes.push(new preguntasfrecuentesParametros(parametrosConsulta.preguntas1, parametrosConsulta.respuestas));
        console.log(request.preguntas1);
        preguntasHtml=preguntasHtml.concat('<h1> Pregunta </h1> ',request.preguntas1);
        preguntasHtml=preguntasHtml.concat('<p> Respuesta</p>', request.respuestas);

        return response.send(this.preguntas_frecuentes);
    }

    @Get('preguntas')
    mostrarPreguntas(@Res () response){
        return response.status(200).send(preguntasHtml)
    }


}

class preguntasfrecuentesParametros{
    constructor(public preguntas1: string,
                public respuestas: string){
    }

}
import {Get, Controller, Req, Res} from '@nestjs/common';

const fs = require("fs");

@Controller() // decorators
export class AppController {
    @Get()
    root(@Req() request, @Res() response) {
        console.log('1 Inicio');
        let contenidoHtml = '';
        console.log('2 contenidoHtml', contenidoHtml);

        fs.readFile(
            __dirname + '/html/Index.html',
            'utf8',
            (error, contenidoDelArchivo) => {
                console.log('3 Respondio');
                const nombre = 'Dennis';
                if (error) {
                    console.log('4 Error', error);
                    console.log('5 contenidoHtml', contenidoHtml);
                    console.log('6 Termino');
                    return response.send('Error');
                } else {
                    contenidoHtml = contenidoDelArchivo;

                    contenidoHtml = contenidoHtml.replace('{{nombre}}', nombre);


                    console.log('4 contenidoHtml', contenidoHtml);
                    console.log('5 contenidoHtml', contenidoHtml);
                    console.log('6 Termino');
                    return response.send(contenidoHtml);

                }

            }
        );


    }
}
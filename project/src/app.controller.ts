import {Get, Controller, Req, Res} from '@nestjs/common';
import {dirname} from 'path';
import __ = require('lodash/fp/__');

const fs =require("fs");
@Controller()
export class AppController {
    @Get()
    root(@Req() request, @Res() response) {
        let contenidoFooter = '';
        fs.readFile(__dirname + '/html/footer.html', 'utf8', (error, contenidoDelArchivoFooter) => {
                if (error) {
                    return response.send('Error');
                } else {
                    contenidoFooter = contenidoDelArchivoFooter;
                    //contenidoFooter=contenidoFooter.replace('{{}}');
                }
            }
        );

        let contenidoHeader=fs.readFile(__dirname + '/html/header.html', 'utf8',(error, contenidoDelArchivoHeader) => {
            if (error) {
                return response.send('Error');
            } else {
                contenidoHeader = contenidoDelArchivoHeader;
                // contenidoHeader=contenidoHeader.replace('{{}}');
            }
        }
        );

        let contenidoContenido=fs.readFile(__dirname + '/html/contenido.html', 'utf8',(error, contenidoDelArchivoContenido) => {
                if (error) {
                    return response.send('Error');
                } else {
                    contenidoContenido = contenidoDelArchivoContenido;
                    // contenidoHeader=contenidoHeader.replace('{{}}');
                }
            }
        );
    }
}
// '/html/header.html','/html/contenido.html',

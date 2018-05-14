import {Body, Controller, Get, Headers, Param, Post, Query, Req, Res} from "@nestjs/common";

@Controller('Parametros')
export class ParametrosController {

    @Post('devolver/:id/:modelo')
    devolverParametros(
        @Req() request,
        @Res() response,
        @Query() queryParams,
        @Body() bodyParams,
        @Param() paramsParams
    ) {
        const respuesta = {
            queryParams: queryParams,
            bodyParams: bodyParams,
            paramsParams: paramsParams
        };
        return response.send(respuesta);
    }

    @Get('ReqRes')
    requestResponse(
        @Req() request,
        @Res() response,
        @Headers() headers
    ) {
        const respuesta = {
            baseUrl: request.baseUrl,
            hostname: request.hostname,
            subdomains: request.subdomains,
            ip: request.ip,
            method: request.method,
            originalUrl: request.originalUrl,
            path: request.path,
            protocol: request.protocol,
            headers,
        };
        console.log(respuesta);
        return response.redirect('/Usuario/mostrar');///Usuario/mostrar
    }

}
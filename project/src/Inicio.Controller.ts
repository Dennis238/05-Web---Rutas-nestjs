import {Controller, Get, HttpCode, Req, Res} from '@nestjs/common';

@Controller('Home')
export class InicioController{

    @HttpCode(200)
    @Get('Home')
    homeInicio(
        @Req() request,
        @Res() response
    )
    {
        if(response.status==500){
            console.log("existen errores");

    }else{
            return response.status
    }
    }
}





import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const cookieParser = require('cookie-parser');
// npm i cookie-parser --save
async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(3000);
}

bootstrap();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { WinstonLogger } from './logger/winston.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonLogger,
    });

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new JwtAuthGuard(reflector));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Xóa field thừa
            forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ
            transform: true, // Tự động chuyển kiểu
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                return new BadRequestException(
                    validationErrors.map((error) => ({
                        [error.property]: Object.values(
                            error.constraints || {},
                        ).join(', '),
                    })),
                );
            },
        }),
    );

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3001);

    console.log(
        `Application is running on: localhost:${process.env.PORT ?? 3001}`,
    );

    const dataSource = app.get(DataSource);

    if (dataSource.isInitialized) {
        console.log('✅ Database connected!');
    } else {
        console.error('❌ Database not connected');
    }
}
bootstrap();

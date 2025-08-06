import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST as any,
            port: process.env.DB_PORT as any,
            username: process.env.DB_USERNAME as any,
            password: process.env.DB_PASSWORD as any,
            database: process.env.DB_DATABASE as any,
            entities: [User],
            synchronize: true,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(LoggingMiddleware).forRoutes('*');
    // }
}

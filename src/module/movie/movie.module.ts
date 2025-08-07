import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { User } from 'src/entity/user.entity';

@Module({
    controllers: [MovieController],
    providers: [MovieService],
    imports: [TypeOrmModule.forFeature([Comment, User])],
})
export class MovieModule {}

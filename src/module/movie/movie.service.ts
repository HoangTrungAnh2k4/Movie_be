import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommentDto } from './dto/addComment.dto';
import { Comment } from '../../entity/comment.entity';
import { User } from 'src/entity/user.entity';
import { CommentWithUsernameDto } from './dto/comment-with-username.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async getComments(movieName: string): Promise<CommentWithUsernameDto[]> {
        const comments = await this.commentRepo.find({
            where: { movieName },
            relations: ['user'],
        });

        if (comments.length === 0) {
            throw new HttpException(
                `No comments found for movie: ${movieName}`,
                HttpStatus.NOT_FOUND,
            );
        }

        return comments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            username: comment.user.email,
        }));
    }

    async addComment(commentDto: AddCommentDto) {
        const user = await this.userRepo.findOneByOrFail({
            id: commentDto.userId,
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const newComment = this.commentRepo.create({
            content: commentDto.content,
            movieName: commentDto.movieName,
            user: user,
        });

        await this.commentRepo.save(newComment);

        return {
            message: 'Comment added successfully',
            comment: {
                content: commentDto.content,
                movieName: commentDto.movieName,
            },
        };
    }
}

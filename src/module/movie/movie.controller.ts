import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddCommentDto } from './dto/addComment.dto';
import { CommentWithUsernameDto } from './dto/comment-with-username.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Public()
    @Get('comment/:movieName')
    async getComments(
        @Param('movieName') movieName: string,
    ): Promise<CommentWithUsernameDto[]> {
        return this.movieService.getComments(movieName);
    }

    @Post('comment')
    async addComment(@Request() req: any) {
        const comment: AddCommentDto = {
            content: req.body.content,
            movieName: req.body.movieName,
            userId: req.user.userId,
        };
        return this.movieService.addComment(comment);
    }
}

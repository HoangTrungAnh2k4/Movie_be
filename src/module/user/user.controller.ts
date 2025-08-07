import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/profile')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @Post('/add-favorite-movie/:movieName')
    addFavoriteMovie(@Request() req: any) {
        const userId = req.user.userId;
        const movieName = req.params.movieName;

        if (!userId || !movieName) {
            throw new HttpException(
                'User ID and movie name are required',
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.userService.addFavoriteMovie(userId, movieName);
    }

    @Get('/favorite-movie')
    getFavoriteMovies(@Request() req: any) {
        const userId = req.user.userId;

        if (!userId) {
            throw new HttpException(
                'User ID is required',
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.userService.getFavoriteMovies(userId);
    }
}

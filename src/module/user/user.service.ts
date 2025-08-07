import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addFavoriteMovie(
        userId: string,
        movieName: string,
    ): Promise<{ message: string }> {
        if (!userId) {
            throw new HttpException(
                'User ID is required',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (!user.favoriteMovies) {
            user.favoriteMovies = [];
        }

        if (!user.favoriteMovies.includes(movieName)) {
            user.favoriteMovies.push(movieName);
            await this.userRepository.save(user);
            return { message: 'Movie added to favorites successfully' };
        }

        return { message: 'Movie is already in favorites' };
    }

    async getFavoriteMovies(userId: string): Promise<string[]> {
        if (!userId) {
            throw new HttpException(
                'User ID is required',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user.favoriteMovies || [];
    }
}

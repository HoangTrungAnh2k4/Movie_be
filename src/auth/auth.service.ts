import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import CreateUserDto from './dto/create-uer.dto';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    async createUser(userData: CreateUserDto): Promise<{ message: string }> {
        const newUser = this.userRepo.create(userData);

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        try {
            await this.userRepo.save(newUser);

            return {
                message: 'User created successfully',
            };
        } catch (error) {
            if (
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505' // PostgreSQL unique_violation
            ) {
                throw new HttpException(
                    'Email already exists',
                    HttpStatus.CONFLICT,
                );
            }

            throw error;
        }
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
        });

        return {
            access_token: accessToken,
        };
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepo.findOne({
            where: { email },
        });

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }
}

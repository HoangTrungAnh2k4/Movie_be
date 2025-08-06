import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import CreateUserDto from './dto/create-uer.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('auth')
export class AuthController {
    private logger = new Logger(AuthController.name);
    constructor(private readonly authService: AuthService) {}

    @HttpCode(201)
    @Public()
    @Post('/register')
    async createUser(
        @Body() userData: CreateUserDto,
    ): Promise<{ message: string }> {
        console.log('userData', userData);

        return this.authService.createUser(userData);
    }

    @HttpCode(200)
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any): Promise<{ access_token: string }> {
        // this.logger.log(`User ${req.user.email} logged in`);
        return this.authService.login(req.user);
    }
}

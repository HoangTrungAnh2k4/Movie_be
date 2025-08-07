import { IsString } from 'class-validator';
import { User } from 'src/entity/user.entity';

export class AddCommentDto {
    @IsString()
    content: string;

    @IsString()
    movieName: string;

    @IsString()
    userId: string;
}

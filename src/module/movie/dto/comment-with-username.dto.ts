import { IsString } from 'class-validator';

export class CommentWithUsernameDto {
    @IsString()
    id: string;

    @IsString()
    content: string;

    @IsString()
    createdAt: Date;

    @IsString()
    username: string;
}

import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // This guard uses the 'local' strategy defined in passport-local.strategy.ts
    // It will automatically handle the validation of user credentials
    // and throw an UnauthorizedException if the validation fails.
}

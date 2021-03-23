
import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken'
import { Reflector } from '@nestjs/core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        if (req.headers.authorization === undefined) {
            throw new UnauthorizedException("Usuario no autorizado");
        }

        var tkn = req.headers.authorization.split(' ')[1];

        var token = jwt.verify(tkn, 'topSecret');

        if (token == null) {
            throw new UnauthorizedException("Usuario no autorizado");
        }
        return true;
    }
}

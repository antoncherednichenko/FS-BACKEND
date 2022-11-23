import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from './types';

export const User = createParamDecorator((data: IUser, ctx: ExecutionContext) => {
    console.log(data)
    const request = ctx.switchToHttp().getRequest()
    return request.user
}) 
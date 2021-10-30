import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
@Injectable()
export class IsAuthonticat implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

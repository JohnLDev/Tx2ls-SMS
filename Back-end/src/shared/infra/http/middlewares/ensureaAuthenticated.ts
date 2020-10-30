import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }
  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret as string)

    const { sub } = decoded as ITokenPayload
    const [user_id, subUser_id] = sub.split('_')
    request.user = { id: user_id }
    request.sub_User = { id: subUser_id }
    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}

import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求地址
 */
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 默认异常处理器
 */
export const defaultErrorHangler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let statueCode: number, message: string;

  /**
   * 处理异常
   */
  switch (error.message) {
    default:
      statueCode = 500;
      message = '服务暂时出了点问题~~🌲';
      break;
  }
  response.status(statueCode).send({ message });
};

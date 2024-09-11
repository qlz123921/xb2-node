import { Request, Response, NextFunction } from 'express';
import { SomeSpecificError } from './errors.js';
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
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error('Error occurred:', error);
  let statusCode = 500;
  let message = '服务暂时出了点问题~~🌲';

  /**
   * 处理异常
   */
  switch (error instanceof SomeSpecificError) {
    case true:
      statusCode = 400;
      message = 'Specific error occurred';
      break;
    default:
      // Handle general errors or unknown errors
      statusCode = 500;
      message = '服务暂时出了点问题~~🌲';
      break;
  }
  // response.status(statusCode).send({ message });
  response.status(200).json({ message: 'Success' });
};

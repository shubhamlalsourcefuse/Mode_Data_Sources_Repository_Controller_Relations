import {Next} from '@loopback/core';
import {MiddlewareContext, Request} from '@loopback/rest';



export class LoggerMiddleware {
  value() {
    return async (context: MiddlewareContext, next: Next) => {
      const startTime = Date.now();

      const request: Request = context.request;
      const userAgent = request.headers['user-agent'] || 'NA';
      const referer = request.headers.referer || '-';
      const ip = request.ip;

      try {
        const data = await next();

        const endTime = Date.now() - startTime;

        console.log(`Task completed in ${endTime}ms, Referer: ${referer}, User-Agent: ${userAgent}, Request IP: ${ip}`);

        return data
      } catch (error) {
        const reqTime = Date.now() - startTime;
        console.log(`Error occurred: ${error.message}, Error time: ${reqTime}ms`);
        throw error;

      }
    }
  }
}

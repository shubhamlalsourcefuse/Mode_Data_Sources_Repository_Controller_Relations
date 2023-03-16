import {Next} from '@loopback/core';
import {MiddlewareContext, Request} from '@loopback/rest';



export class CorsMiddleware {

  value() {
    return async (requestContext: MiddlewareContext, next: Next) => {
      const request: Request = requestContext.request;
      const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
      const currentOrigin = request.headers['access-control-allow-origin']

      try {
        if (ALLOWED_ORIGIN === currentOrigin) {
          return await next();
        } else {
          return {error: {message: "Origin Not Allowed!"}}
        }
      } catch (error) {
        console.log('Error While Validating Origin');
        throw error
      }
    }
  }
}

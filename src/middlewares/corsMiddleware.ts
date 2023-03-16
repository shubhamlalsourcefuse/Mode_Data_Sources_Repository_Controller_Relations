import {Next} from '@loopback/core';
import {MiddlewareContext, Request} from '@loopback/rest';
import * as url from 'url';


export class CorsMiddleware {

  value() {
    return async (requestContext: MiddlewareContext, next: Next) => {
      const request: Request = requestContext.request;
      const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
      const requestURL = request.headers.referer ?? '';
      // const currentOrigin = request.headers['access-control-allow-origin']
      const currentOrigin = url.parse(requestURL).host;

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

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpResponseHandlerService} from "../services/http-response-handler.service";

/**
 * The Error Interceptor intercepts http responses from the api to check if there were any errors.
 * All errors are re-thrown up to the calling service so an alert can be displayed to the user.
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private responseHandler: HttpResponseHandlerService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse, source) =>
          this.responseHandler.onCatch(err, source)
        )
      );
  }

}

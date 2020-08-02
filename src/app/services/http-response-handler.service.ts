import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class HttpResponseHandlerService {

  constructor(
    private toastService: ToastService
  ) {
  }

  public onCatch(response: HttpErrorResponse, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 409:
        this.handleConflict(response);
        break;
      case 500:
        this.handleServerError();
        break;
      default:
        this.handleServerError();
        break;
    }
    return throwError(response);
  }

  private handleConflict(responseBody: HttpErrorResponse): void {
    this.toastService.showError(responseBody.error.error);
  }

  private handleServerError(): void {
    this.toastService.showError(
      'Error',
      'El servidor encontró una condición inesperada.'
    );
  }
}

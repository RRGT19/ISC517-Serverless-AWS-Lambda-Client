import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) {
  }

  showError(title: string, message?: string) {
    this.toastr.error(message, title);
  }

}

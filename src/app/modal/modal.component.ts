import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {API, IStudent} from "../dashboard/dashboard.component";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string;
  @Input() student: IStudent = {
    id: null,
    firstName: null,
    lastName: null,
    code: null,
    phone: null
  };

  constructor(
    private http: HttpClient,
    public modal: NgbActiveModal
  ) {
  }

  onSubmit() {
    if (this.student.id) {
      this.http.put<IStudent>(API, this.student).toPromise().then(() => this.modal.close('edited'));
    } else {
      this.http.post<IStudent>(API, this.student).toPromise().then(() => this.modal.close('created'));
    }
  }

}

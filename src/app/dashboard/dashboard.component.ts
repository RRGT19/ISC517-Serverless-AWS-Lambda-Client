import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import {map} from "rxjs/operators";

export const API = 'https://my-awesome-api-gateway-endpoint';

export interface IStudent {
  id: number;
  name: string;
  email: string;
  time: string;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  studentList: IStudent[] = [];

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.http.get<{ statusCode: number, body: string }>(API)
      .pipe(
        map(i => JSON.parse(i.body)),
        map(items => items.sort((a1: IStudent, a2: IStudent) => {
          if (a1.time < a2.time) return -1;
          if (a1.time > a2.time) return 1;
          return 0;
        }))
      )
      .toPromise()
      .then(res => this.studentList = res);
  }

  delete(studentId: number) {
    this.http.delete(API + '/' + studentId).toPromise().then(() => this.getAll());
  }

  launchModal(student?: IStudent) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Crear';
    if (student) {
      const copyObj = JSON.parse(JSON.stringify(student));
      modalRef.componentInstance.title = 'Editar';
      modalRef.componentInstance.student = copyObj;
    }
    modalRef.result.then(res => {
      if (res) {
        this.getAll();
      }
    });
  }

}

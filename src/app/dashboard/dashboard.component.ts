import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";

export const API = 'http://localhost:8080/';

export interface IStudent {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  phone: string;
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
    this.http.get<IStudent[]>(API).toPromise().then(res => this.studentList = res);
  }

  delete(studentId: number) {
    this.http.delete(API + studentId).toPromise().then(() => this.getAll());
  }

  launchModal(student?: IStudent) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Crear nuevo';
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

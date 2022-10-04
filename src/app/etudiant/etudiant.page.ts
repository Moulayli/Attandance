import { Component, OnInit } from '@angular/core';

import { StudentService, Student } from '../student.service';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
 public student: Student;
 public edittedStudent: Student ;
 presentingElement = null;
  constructor(private activatedRoute: ActivatedRoute , private studentService: StudentService, ) { }

  ngOnInit() {
    const studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.student = this.studentService.getStudent(studentId);
    this.edittedStudent = Object.assign({}, this.student);
    this.presentingElement = document.querySelector('.ion-page');
  }

  save(){
    Object.assign(this.student, this.edittedStudent);
    
  }
  Cancel(){
    this.edittedStudent = Object.assign({}, this.student);
  }
}

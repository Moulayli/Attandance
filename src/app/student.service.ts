import { Injectable } from '@angular/core';

export interface Student {
  id: string;
  firtName: string;
  lastName: string;
  birthDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  status?: "present" | "absent" ;
}

/*
const mockstudents : Student[] = [
  {
    id: '1',
    firtName: 'John',
    lastName: 'Doe',
    birthDate: '01/01/2000',
    parentName: 'John Doe',
    parentPhone: '123456789',
    parentEmail: 'm2x@gmaail.com ',
    status : 'present'
  },
  {
    id: '2',
    firtName: 'Jane',
    lastName: 'Doe',
    birthDate: '01/01/2000',
    parentName: 'Jane Doe',
    parentPhone: '123456789',
    parentEmail: 'mljd@sdkjkd.com ',
    status : 'present'
  },
  {
    id: '3',
    firtName: 'John',
    lastName: 'Smith',
    birthDate: '01/01/2000',
    parentName: 'John Smith',
    parentPhone: '123456789',
    parentEmail: 'mlmd@sdml.dd',
    status : 'present'
  },];
  */



@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] 

  constructor() { 
    this.students = [
      {
        id: '1',
        firtName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        parentName: 'John Doe',
        parentPhone: '123456789',
        parentEmail: 'm2x@gmaail.com ',
        status : 'absent'
      },
      {
        id: '2',
        firtName: 'Jane',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        parentName: 'Jane Doe',
        parentPhone: '123456789',
        parentEmail: 'mljd@sdkjkd.com ',
        status : 'present'
      },
      {
        id: '3',
        firtName: 'John',
        lastName: 'Smith',
        birthDate: '01/01/2000',
        parentName: 'John Smith',
        parentPhone: '123456789',
        parentEmail: 'mlmd@sdml.dd',
        status : 'present'
      },
    ]
  }

/*
  getAllStudents() {
    return [...mockstudents];
  }*/
  getAll() {
    return this.students;
  }

  deleteStudent(id: string) {
    this.students = this.students.filter(student => student.id !== id);
  }
  markStudent(id: string) {
    this.students = this.students.map(student => {
      if (student.id === id) {
        student.status = 'present';
      }
      return student;
    });
  }
  markStudentAbsent(id: string) {
    this.students = this.students.map(student => {
      if (student.id === id) {
        student.status = 'absent';
      }
      return student;
    });
  }

  getStudent(id: string) {
    return this.students.find(student => student.id === id);
  }


}

import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../student.service';

import { ActionSheetController, AlertController ,ToastController} from '@ionic/angular';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {
  public students: Student[];
  result: string = 'no result';
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private studentService: StudentService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentActionSheet(students: Student) {
    const actionSheet = await this.actionSheetController.create({
      // subHeader: 'Example subheader',
      header: students.firtName + ' ' + students.lastName,
      subHeader: 'options etudiant',
      buttons: [
        {
          icon: 'trash-outline',
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
            id: students.id,
          },
        },
        {
          icon: 'eye-outline',
          text: 'Mark present',
          data: {
            action: 'present',
            id: students.id,
          },
        },
        {
          icon: 'eye-off-outline',
          text: 'Mark absent',
          data: {
            action: 'absent',
            id: students.id,
          },
        },
        {
          icon: 'close-outline',
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.data.action == 'delete') {

      this.presentAlert(students);
      /*
      this.studentService.deleteStudent(result.data.id);
      this.students = this.studentService.getAll();*/
    }
    if (result.data.action == 'present') {
      this.studentService.markStudent(result.data.id);
      this.students = this.studentService.getAll();
    }
    if (result.data.action == 'absent') {
      this.studentService.markStudentAbsent(result.data.id);
      this.students = this.studentService.getAll();
    }
  }

  async presentAlert(students : Student) {
    const alert = await this.alertController.create({
      header: 'Suprimer cet etudiant !',
      message: 'Cette operation ne peut pas etre annuler',
      buttons: [
        {
          text: 'Suprimer',
          role: 'cancel',
          handler: () => {
            this.studentService.deleteStudent(students.id);
            this.students = this.studentService.getAll();
            this.presentToast(students,'top');
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Finalement non ...',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  async presentToast(students:Student ,position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: students.firtName + ' ' + students.lastName + ' a ete suprimer',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  ngOnInit() {
    this.students = this.studentService.getAll();
  }
}

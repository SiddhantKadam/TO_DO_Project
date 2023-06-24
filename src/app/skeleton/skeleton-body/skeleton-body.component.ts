import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/app.model';
import { UserService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from 'src/app/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skeleton-body',
  templateUrl: './skeleton-body.component.html',
  styleUrls: ['./skeleton-body.component.css']
})
export class SkeletonBodyComponent {
  view: string;
  constructor(public dialog: MatDialog, private router: Router, private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe((message) => {
      if (message === "new_task") {
        this.dialog.closeAll();
      }
    });
  }

  ngOnInit(): void {
    this.view = 'list';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'create-task',
  templateUrl: 'create-task.html',
})
export class DialogContentExampleDialog {
  taskModel = new Task();
  taskForm: FormGroup | any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public userService: UserService, private _snackBar: MatSnackBar, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.validation();
  }

  get f() { return this.taskForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.createTask();
  }

  validation() {
    this.taskForm = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  createTask() {
    this.taskModel.key = String(Math.floor((Math.random() * 1000) + 1));
    this.userService.create(this.taskModel).subscribe((result) => {
      this.notification('Save succesfully !', 'OK');
      this.sharedDataService.changeMessage("new_task");
    })
  }

  notification(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}


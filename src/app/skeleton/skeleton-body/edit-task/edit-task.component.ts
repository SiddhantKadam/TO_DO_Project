import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/app.model';
import { UserService } from 'src/app/app.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  taskModel = new Task();
  taskForm: FormGroup | any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.validation();
    const id = this.route.snapshot.paramMap.get('id')
    this.getAllTasks(id);
  }

  get f() { return this.taskForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.updateTask();
  }

  validation() {
    this.taskForm = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  getAllTasks(id: any) {
    this.userService.getById(id).subscribe((result) => {
      this.taskModel = result;
    })
  }

  updateTask() {
    this.userService.update(this.taskModel.id, this.taskModel).subscribe((result) => {
      this.notification('Update succesfully !', 'OK')
      this.redirectHome();
    })
  }

  redirectHome() {
    this.router.navigateByUrl("");
  }

  notification(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

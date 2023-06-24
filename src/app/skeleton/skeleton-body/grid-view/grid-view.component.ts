import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/app.service';
import { SharedDataService } from 'src/app/shared.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent {
  taskList: any

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar, private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe((message) => {
      if (message === "new_task") {
        this.getAllTasks();
      }
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.userService.getAll().subscribe((result) => {
      this.taskList = result;
    })
  }

  notification(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getTaskById(id: string) {
    this.router.navigate(["/app-edit-task", id]);
  }

  deleteTask(id: string) {
    this.userService.delete(id).subscribe((result) => {
      this.notification('Delete succesfully !', 'OK');
      this.getAllTasks();
    })
  }

  onChange(data: any) {
    this.userService.update(data.id, data).subscribe((result) => {
      this.notification('Status update succesfully !', 'OK');
    })
  }

}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/app.service';
import { SharedDataService } from 'src/app/shared.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  selectedValue: string;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<any>();

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
      this.dataSource = new MatTableDataSource(result);
    })
  }

  getTaskById(id: string) {
    this.router.navigate(["/app-edit-task", id]);
  }

  notification(message: string, action: string) {
    this._snackBar.open(message, action);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

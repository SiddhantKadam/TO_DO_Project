import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewComponent } from './grid-view.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from 'src/app/shared.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { mockHttpClient } from 'src/app/mock-data';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridViewComponent],
      providers: [
        { provide: HttpClient, useClass: mockHttpClient },
        MatSnackBar,
        SharedDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit and expect it to call gettAllTasks', () => {
    spyOn(component, "getAllTasks");

    component.ngOnInit();

    expect(component.getAllTasks).toHaveBeenCalled();
  });

  it('test getAllTasks and expect it to call getAll', () => {
    const result = {
      id: "1",
      key: "TO-101",
      task: "test",
      description: "unit",
      priority: "High",
      status: "Completed"
    }
    const user = TestBed.get(UserService)
    spyOn(user, "getAll").and.returnValue(of(result))

    component.getAllTasks();

    expect(user.getAll).toHaveBeenCalled();
    expect(component.taskList).toEqual(result);
  });

  it('test notification and expect it to call open', () => {
    const matSnackBar = TestBed.get(MatSnackBar)
    spyOn(matSnackBar, "open");

    component.notification("Message", "Ok");

    expect(matSnackBar.open).toHaveBeenCalledWith("Message", "Ok");
  });

  it('test getTaskById and expect it to call navigate', () => {
    const router = TestBed.get(Router);
    spyOn(router, "navigate");

    component.getTaskById("1");

    expect(router.navigate).toHaveBeenCalledWith(["/app-edit-task", "1"]);
  });

  it('test deleteTask and expect it to call notification and getAllTasks', () => {
    const user = TestBed.get(UserService)
    spyOn(user, "delete").and.returnValue(of({}));
    spyOn(component, "notification");
    spyOn(component, "getAllTasks");

    component.deleteTask("1");

    expect(user.delete).toHaveBeenCalledWith("1");
    expect(component.notification).toHaveBeenCalled();
    expect(component.getAllTasks).toHaveBeenCalled();
  });

  it('test onChange and expect it to call notification and update', () => {
    const data = {
      id: "1",
      key: "TO-101",
      task: "test",
      description: "unit",
      priority: "High",
      status: "Completed"
    }
    const user = TestBed.get(UserService)
    spyOn(user, "update").and.returnValue(of({}));
    spyOn(component, "notification");

    component.onChange(data);

    expect(user.update).toHaveBeenCalledWith(data.id, data);
    expect(component.notification).toHaveBeenCalled();
  });
});

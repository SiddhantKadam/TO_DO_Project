import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/app.service';
import { mockHttpClient } from 'src/app/mock-data';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskComponent],
      providers: [
        { provide: HttpClient, useClass: mockHttpClient },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: number) => { id: 1 } } } } },
        MatSnackBar
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit and expect it to call validation & gettAllTasks', () => {
    spyOn(component, "validation");
    spyOn(component, "getAllTasks");

    component.ngOnInit();

    expect(component.validation).toHaveBeenCalled();
    expect(component.getAllTasks).toHaveBeenCalled();
  });

  it('test onSubmit and expect it to call updateTask', () => {
    spyOn(component, "updateTask");
    component.taskForm = { "invalid": undefined }

    component.onSubmit();

    expect(component.submitted).toEqual(true);
    expect(component.updateTask).toHaveBeenCalled();
  });

  it('test getAllTasks with parameter and expect it to call getById', () => {
    const result = {
      id: "1",
      key: "TO-101",
      task: "test",
      description: "unit",
      priority: "High",
      status: "Completed"
    }
    const user = TestBed.get(UserService)
    spyOn(user, "getById").and.returnValue(of(result))

    component.getAllTasks("1");

    expect(component.taskModel).toEqual(result);
    expect(user.getById).toHaveBeenCalled();
  });

  it('test updateTask and expect it to call notification and update', () => {
    const user = TestBed.get(UserService)
    spyOn(component, "notification");
    spyOn(user, "update").and.returnValue(of({}))

    component.updateTask();

    expect(component.notification).toHaveBeenCalled();
    expect(user.update).toHaveBeenCalled();
  });

  it('test redirectHome and expect it to call navigateByUrl', () => {
    const router = TestBed.get(Router)
    spyOn(router, "navigateByUrl");

    component.redirectHome();

    expect(router.navigateByUrl).toHaveBeenCalledWith("");
  });

  it('test notification and expect it to call open', () => {
    const matSnackBar = TestBed.get(MatSnackBar)
    spyOn(matSnackBar, "open");

    component.notification("Message", "Ok");

    expect(matSnackBar.open).toHaveBeenCalledWith("Message", "Ok");
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExampleDialog, SkeletonBodyComponent } from './skeleton-body.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { mockHttpClient } from 'src/app/mock-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from 'src/app/shared.service';
import { UserService } from 'src/app/app.service';
import { of } from 'rxjs';

describe('SkeletonBodyComponent', () => {
  let component: SkeletonBodyComponent;
  let fixture: ComponentFixture<SkeletonBodyComponent>;

  beforeEach(() => {
    let matDialogService: jasmine.SpyObj<MatDialog>;
    matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [SkeletonBodyComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogService },
        SharedDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SkeletonBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit and expect it to equal to list', () => {

    component.ngOnInit();

    expect(component.view).toEqual("list");
  });
});

describe('DialogContentExampleDialog', () => {
  let component: DialogContentExampleDialog;
  let fixture: ComponentFixture<DialogContentExampleDialog>;

  beforeEach(() => {
    let matDialogService: jasmine.SpyObj<MatDialog>;
    matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [DialogContentExampleDialog],
      providers: [
        { provide: MatDialog, useValue: matDialogService },
        { provide: HttpClient, useClass: mockHttpClient },
        MatSnackBar,
        SharedDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DialogContentExampleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit and expect it to call validation', () => {
    spyOn(component, "validation");

    component.ngOnInit();

    expect(component.validation).toHaveBeenCalled();
  });

  it('test onSubmit and expect it to call createTask', () => {
    spyOn(component, "createTask");
    component.taskForm = { invalid: undefined }
    component.onSubmit();

    expect(component.submitted).toEqual(true);
    expect(component.createTask).toHaveBeenCalled();
  });

  it('test createTask and expect it to call notification', () => {
    const user = TestBed.get(UserService)
    spyOn(user, "create").and.returnValue(of({}));
    spyOn(component, "notification");

    component.createTask();

    expect(user.create).toHaveBeenCalled();
    expect(component.notification).toHaveBeenCalled();
  });

  it('test notification and expect it to call open', () => {
    const matSnackBar = TestBed.get(MatSnackBar)
    spyOn(matSnackBar, "open");

    component.notification("Message", "Ok");

    expect(matSnackBar.open).toHaveBeenCalledWith("Message", "Ok");
  });
});

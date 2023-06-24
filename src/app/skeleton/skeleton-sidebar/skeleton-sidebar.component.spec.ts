import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSidebarComponent } from './skeleton-sidebar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SkeletonSidebarComponent', () => {
  let component: SkeletonSidebarComponent;
  let fixture: ComponentFixture<SkeletonSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonSidebarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SkeletonSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

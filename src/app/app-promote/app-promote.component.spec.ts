import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPromoteComponent } from './app-promote.component';

describe('AppPromoteComponent', () => {
  let component: AppPromoteComponent;
  let fixture: ComponentFixture<AppPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPromoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

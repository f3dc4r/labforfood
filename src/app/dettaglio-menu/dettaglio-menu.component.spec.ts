import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioMenuComponent } from './dettaglio-menu.component';

describe('DettaglioMenuComponent', () => {
  let component: DettaglioMenuComponent;
  let fixture: ComponentFixture<DettaglioMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniUtenteComponent } from './ordini-utente.component';

describe('OrdiniUtenteComponent', () => {
  let component: OrdiniUtenteComponent;
  let fixture: ComponentFixture<OrdiniUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdiniUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

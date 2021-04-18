import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioOrdiniComponent } from './dettaglio-ordini.component';

describe('DettaglioOrdiniComponent', () => {
  let component: DettaglioOrdiniComponent;
  let fixture: ComponentFixture<DettaglioOrdiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioOrdiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioOrdiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

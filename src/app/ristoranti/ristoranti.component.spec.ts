import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RistorantiComponent } from './ristoranti.component';

describe('RistorantiComponent', () => {
  let component: RistorantiComponent;
  let fixture: ComponentFixture<RistorantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RistorantiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RistorantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

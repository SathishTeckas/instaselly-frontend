import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsCompactComponent } from './stock-details-compact.component';

describe('StockDetailsCompactComponent', () => {
  let component: StockDetailsCompactComponent;
  let fixture: ComponentFixture<StockDetailsCompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsCompactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailsCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

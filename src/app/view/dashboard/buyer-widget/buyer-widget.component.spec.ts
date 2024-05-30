import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerWidgetComponent } from './buyer-widget.component';

describe('BuyerWidgetComponent', () => {
  let component: BuyerWidgetComponent;
  let fixture: ComponentFixture<BuyerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

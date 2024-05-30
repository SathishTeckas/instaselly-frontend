import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAddressComponent } from './print-address.component';

describe('PrintAddressComponent', () => {
  let component: PrintAddressComponent;
  let fixture: ComponentFixture<PrintAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

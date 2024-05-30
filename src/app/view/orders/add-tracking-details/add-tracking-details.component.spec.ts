import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackingDetailsComponent } from './add-tracking-details.component';

describe('AddTrackingDetailsComponent', () => {
  let component: AddTrackingDetailsComponent;
  let fixture: ComponentFixture<AddTrackingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrackingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrackingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

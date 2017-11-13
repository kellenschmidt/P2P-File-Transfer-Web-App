import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCancelledComponent } from './transfer-cancelled.component';

describe('TransferCancelledComponent', () => {
  let component: TransferCancelledComponent;
  let fixture: ComponentFixture<TransferCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

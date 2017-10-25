import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferApprovalComponent } from './transfer-approval.component';

describe('TransferApprovalComponent', () => {
  let component: TransferApprovalComponent;
  let fixture: ComponentFixture<TransferApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

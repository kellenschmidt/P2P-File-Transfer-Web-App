import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTransferStepperComponent } from './file-transfer-stepper.component';

describe('FileTransferStepperComponent', () => {
  let component: FileTransferStepperComponent;
  let fixture: ComponentFixture<FileTransferStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTransferStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

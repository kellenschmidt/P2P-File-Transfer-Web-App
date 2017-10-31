import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileComponent } from './input-file.component';

describe('InputFileComponent', () => {
  let component: InputFileComponent;
  let fixture: ComponentFixture<InputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputFileComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        // Material modules
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        {provide: NgControl, useValue: NG_VALUE_ACCESSOR}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

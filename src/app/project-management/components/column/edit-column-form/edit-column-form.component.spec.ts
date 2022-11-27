import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColumnFormComponent } from './edit-column-form.component';

describe('EditColumnFormComponent', () => {
  let component: EditColumnFormComponent;
  let fixture: ComponentFixture<EditColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditColumnFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

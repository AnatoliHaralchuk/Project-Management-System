import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardFormComponent } from './edit-board-form.component';

describe('EditBoardFormComponent', () => {
  let component: EditBoardFormComponent;
  let fixture: ComponentFixture<EditBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoardFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

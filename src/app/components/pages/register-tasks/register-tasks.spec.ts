import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTasks } from './register-tasks';

describe('RegisterTasks', () => {
  let component: RegisterTasks;
  let fixture: ComponentFixture<RegisterTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

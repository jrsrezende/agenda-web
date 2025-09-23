import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateUser } from './authenticate-user';

describe('AuthenticateUser', () => {
  let component: AuthenticateUser;
  let fixture: ComponentFixture<AuthenticateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticateUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

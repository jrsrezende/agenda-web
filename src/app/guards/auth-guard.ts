import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authData = sessionStorage.getItem('auth');

  try {
  if(authData) {
    const user = JSON.parse(authData)

    const token = user.token;
    const now = new Date();
    const exp = new Date(user.expiresAt);

    if(token && exp > now) {
      return true;
    }
  } 
} catch (e) {
  console.error(e);
}
  
  router.navigate(['/pages/authenticate-user']);
  return false;
};

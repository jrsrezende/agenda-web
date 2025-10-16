import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

function parseJwt(token: string): { exp?: number } | null {
  try {
    const payload = token.split('.')[1]; // pega a parte do meio da JWT
    const decoded = atob(payload);      // decodifica Base64
    return JSON.parse(decoded);         // transforma em objeto
  } catch {
    return null;
  }
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  try {
    const authData = sessionStorage.getItem('auth');
    const user = authData ? JSON.parse(authData) : null;
    const token = user?.token;

    if (token) {
      const payload = parseJwt(token);
      const now = Math.floor(Date.now() / 1000); // timestamp atual em segundos

      if (payload?.exp && payload.exp > now) {
        return true; // token válido
      }
    }
  } catch (e) {
    console.error('Erro ao validar autenticação:', e);
  }

  router.navigate(['/pages/authenticate-user']);
  return false;
};


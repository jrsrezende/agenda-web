import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Só intercepta se a URL tiver como base o servidor desejado
  if (req.url.startsWith(environment.apiTasks) || req.url.startsWith(environment.apiCategories)) {
    // Recupera o dado do sessionStorage
    const authData = sessionStorage.getItem('auth');
    if (authData) {
      try {
        const user = JSON.parse(authData);
        const token = user?.token;
        if (token) {
          // Clona a requisição adicionando
          // o cabeçalho Authorization
          const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}` }});

          return next(authReq);
        }
      } catch (e) {
        console.error('Error retrieving token in the interceptor:', e);
      }
    }
  }
  // Se não cair nas condições acima, segue a requisição original
  return next(req);
};

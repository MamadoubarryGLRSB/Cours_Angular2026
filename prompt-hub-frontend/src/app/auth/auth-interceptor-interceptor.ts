import { HttpInterceptorFn } from '@angular/common/http'

// Envoie le cookie (token JWT httpOnly) avec chaque requête vers l'API
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true }))
}

import { HttpInterceptorFn } from '@angular/common/http'
import { delay } from 'rxjs'
import { environment } from '../../environments/environment'

// Envoie le cookie (token JWT httpOnly) avec chaque requête vers l'API
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true })).pipe(delay(environment.fakeDelay))
}

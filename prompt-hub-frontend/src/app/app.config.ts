import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { ConfirmationService, MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config'

import { routes } from './app.routes'
import { AuthService } from './auth/auth-service'
import { authInterceptor } from './auth/auth-interceptor-interceptor'

const promptPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
  components: {
    progressspinner: {
      root: {
        colorOne: '{primary.500}',
        colorTwo: '{primary.500}',
        colorThree: '{primary.500}',
        colorFour: '{primary.500}',
      },
    },
  },
})

export const appConfig: ApplicationConfig = {
  providers: [
    // Attend /auth/me avant d'afficher l'app : le guard connaît déjà l'utilisateur
    provideAppInitializer(() => inject(AuthService).loadCurrentUser()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    ConfirmationService,
    providePrimeNG({
      theme: {
        preset: promptPreset,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
}

import { Component, effect, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Button } from 'primeng/button'
import { AuthService } from '../../auth/auth-service'

const STORAGE_KEY = 'theme'

function initialDark(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return saved === 'dark'
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router = inject(Router)
  authService = inject(AuthService)
  messageService = inject(MessageService)
  isDark = signal(initialDark())

  constructor() {
    // PrimeNG switches to dark tokens when <html> has the .app-dark class (see app.config.ts)
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark())
      try {
        localStorage.setItem(STORAGE_KEY, this.isDark() ? 'dark' : 'light')
      } catch {}
    })
  }

  toggleDarkMode() {
    this.isDark.update((dark) => !dark)
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.messageService.add({ severity: 'info', summary: 'Déconnexion', detail: 'À bientôt !' })
      void this.router.navigate(['/'])
    })
  }
}

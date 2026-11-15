import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Password } from 'primeng/password'
import { AuthService } from '../../auth/auth-service'

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, Card, InputText, Password, Button],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  router = inject(Router)
  authService = inject(AuthService)
  messageService = inject(MessageService)

  mode = signal<'login' | 'register'>('login')

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      // Même règle que le backend (RegisterDto : MinLength(4))
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })

  toggleMode() {
    this.mode.update((value) => (value === 'login' ? 'register' : 'login'))
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { username, password } = this.form.getRawValue()
    if (this.mode() === 'login') {
      this.login(username, password)
    } else {
      this.register(username, password)
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (user) => this.onSuccess(`Bienvenue ${user.username}`),
      error: () => this.onError("Nom d'utilisateur ou mot de passe incorrect"),
    })
  }

  register(username: string, password: string) {
    this.authService.register(username, password).subscribe({
      next: (user) => this.onSuccess(`Compte créé, bienvenue ${user.username}`),
      error: () => this.onError("Impossible de créer le compte (nom d'utilisateur déjà pris ?)"),
    })
  }

  private onSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail })
    void this.router.navigate(['/'])
  }

  private onError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail })
  }
}

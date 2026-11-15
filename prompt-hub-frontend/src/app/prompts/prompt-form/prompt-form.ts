import { Component, effect, inject, input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { Textarea } from 'primeng/textarea'
import { CategoryService } from '../category-service'
import { PromptService } from '../prompt-service/prompt-service'

@Component({
  selector: 'app-prompt-form',
  imports: [ReactiveFormsModule, RouterLink, Card, InputText, Textarea, Select, Button],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  router = inject(Router)
  promptService = inject(PromptService)
  categoryService = inject(CategoryService)
  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)

  // Rempli automatiquement depuis le paramètre :promptId de la route (withComponentInputBinding)
  promptId = input<number>()

  categories = toSignal(this.categoryService.getCategories())

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  })

  constructor() {
    effect(() => {
      const promptId = this.promptId()
      if (promptId) {
        this.promptService.getPrompt(promptId).subscribe((prompt) => {
          this.form.patchValue({
            title: prompt.title,
            content: prompt.content,
            categoryId: prompt.category.id,
          })
        })
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const prompt = this.form.getRawValue()
    const promptId = this.promptId()
    if (promptId) {
      this.promptService.updatePrompt(promptId, prompt).subscribe({
        next: () => this.onSuccess('Prompt modifié'),
        error: () => this.onError('Impossible de modifier le prompt'),
      })
    } else {
      this.promptService.createPrompt(prompt).subscribe({
        next: () => this.onSuccess('Prompt créé'),
        error: () => this.onError('Impossible de créer le prompt'),
      })
    }
  }

  deletePrompt() {
    const promptId = this.promptId()
    if (!promptId) return
    this.confirmationService.confirm({
      header: 'Supprimer le prompt',
      message: 'Voulez-vous vraiment supprimer ce prompt ? Cette action est irréversible.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.promptService.deletePrompt(promptId).subscribe({
          next: () => this.onSuccess('Prompt supprimé'),
          error: () => this.onError('Impossible de supprimer le prompt'),
        })
      },
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

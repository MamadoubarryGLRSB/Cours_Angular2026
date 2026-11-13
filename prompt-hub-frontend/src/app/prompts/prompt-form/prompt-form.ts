import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const prompt = this.form.getRawValue()
    this.promptService.createPrompt(prompt).subscribe(() => {
      void this.router.navigate(['/'])
    })
  }
}

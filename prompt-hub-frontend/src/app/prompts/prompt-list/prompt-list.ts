import { Component, computed, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Paginator, PaginatorState } from 'primeng/paginator'
import { ProgressSpinner } from 'primeng/progressspinner'
import { finalize } from 'rxjs'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service/prompt-service'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard, Paginator, ProgressSpinner],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService)

  loading = signal(true)
  prompts = toSignal(
    this.promptService.getPrompts().pipe(finalize(() => this.loading.set(false))),
    {
      initialValue: [],
    },
  )

  // Pagination côté client : l'API renvoie déjà tous les prompts
  first = signal(0)
  rows = signal(3)

  pagedPrompts = computed(() => this.prompts().slice(this.first(), this.first() + this.rows()))

  onPageChange(event: PaginatorState) {
    this.first.set(event.first ?? 0)
    this.rows.set(event.rows ?? 3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

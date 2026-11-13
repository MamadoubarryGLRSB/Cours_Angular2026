import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service/prompt-service'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService)

  prompts = toSignal(this.promptService.getPrompts(), { initialValue: [] })
}

import { Component, computed, inject, input } from '@angular/core'
import { Prompt } from '../prompt-list/prompt.model'
import { RouterLink } from '@angular/router'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'
import { Textarea } from 'primeng/textarea'
import { AuthService } from '../../auth/auth-service'

@Component({
  selector: 'app-prompt-card',
  imports: [RouterLink, Button, Card, Tag, Textarea],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  authService = inject(AuthService)
  prompt = input.required<Prompt>()

  // Seul l'auteur du prompt voit le bouton modifier
  canEdit = computed(() => {
    const currentUser = this.authService.currentUser()
    return !!currentUser && this.prompt().author.id === currentUser.id
  })

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(this.prompt().content);
  }
}

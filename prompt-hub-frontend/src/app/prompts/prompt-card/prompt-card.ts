import { Component, computed, inject, input, linkedSignal } from '@angular/core'
import { Prompt } from '../prompt-list/prompt.model'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'
import { Textarea } from 'primeng/textarea'
import { AuthService } from '../../auth/auth-service'
import { PromptService } from '../prompt-service/prompt-service'

@Component({
  selector: 'app-prompt-card',
  imports: [RouterLink, Button, Card, Tag, Textarea],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  router = inject(Router)
  promptService = inject(PromptService)
  authService = inject(AuthService)
  messageService = inject(MessageService)
  prompt = input.required<Prompt>()

  // linkedSignal : part de la valeur de l'input, mais on peut la modifier avec set()
  // (si l'input prompt change, la valeur repart de prompt().score)
  score = linkedSignal(() => this.prompt().score)
  // Dépend aussi de currentUser : à la déconnexion, le pouce coloré s'efface tout seul
  userVote = linkedSignal(() => (this.authService.currentUser() ? this.prompt().userVote : null))

  // Seul l'auteur du prompt voit le bouton modifier
  canEdit = computed(() => {
    const currentUser = this.authService.currentUser()
    return !!currentUser && this.prompt().author.id === currentUser.id
  })

  copyToClipboard(text: string) {
    // writeText renvoie une Promise : then = copié, catch = refusé par le navigateur
    navigator.clipboard
      .writeText(text)
      .then(() =>
        this.messageService.add({ severity: 'success', summary: 'Copié', detail: 'Prompt copié dans le presse-papier' }),
      )
      .catch(() =>
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de copier le prompt' }),
      )
  }

  upvote() {
    if (!this.checkLoggedIn()) return
    this.promptService.upvotePrompt(this.prompt().id).subscribe({
      next: (updatedPrompt) => this.updateVote(updatedPrompt),
      error: () => this.onVoteError(),
    })
  }

  downvote() {
    if (!this.checkLoggedIn()) return
    this.promptService.downvotePrompt(this.prompt().id).subscribe({
      next: (updatedPrompt) => this.updateVote(updatedPrompt),
      error: () => this.onVoteError(),
    })
  }

  private updateVote(updatedPrompt: Prompt) {
    this.score.set(updatedPrompt.score)
    this.userVote.set(updatedPrompt.userVote)
  }

  // Le backend refuse les votes sans connexion (401) : on prévient avant d'envoyer la requête
  private checkLoggedIn() {
    if (this.authService.currentUser()) return true
    this.messageService.add({ severity: 'info', summary: 'Connexion requise', detail: 'Connectez-vous pour voter' })
    void this.router.navigate(['/auth'])
    return false
  }

  private onVoteError() {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Impossible d'enregistrer le vote" })
  }
}

import { Component, input, Input } from '@angular/core'
import { Prompt } from '../prompt-list/prompt.model'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'
import { Textarea } from 'primeng/textarea'

@Component({
  selector: 'app-prompt-card',
  imports: [Button, Card, Tag, Textarea],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt= input.required<Prompt>();   

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(this.prompt().content);
  }
}

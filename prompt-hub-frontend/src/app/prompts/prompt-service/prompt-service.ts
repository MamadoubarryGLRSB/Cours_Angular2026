import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Prompt } from '../prompt-list/prompt.model'

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'prompts'

  getPrompts() {
    return this.httpClient.get<Prompt[]>(this.baseUrl)
  }

  getPrompt(promptId: number) {
    return this.httpClient.get<Prompt>(`${this.baseUrl}/${promptId}`)
  }

  createPrompt(prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt)
  }

  updatePrompt(promptId: number, prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${promptId}`, prompt)
  }

  upvotePrompt(promptId: number) {
    return this.httpClient.post<Prompt>(`${this.baseUrl}/${promptId}/upvote`, {})
  }

  downvotePrompt(promptId: number) {
    return this.httpClient.post<Prompt>(`${this.baseUrl}/${promptId}/downvote`, {})
  }

  deletePrompt(promptId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${promptId}`)
  }
}

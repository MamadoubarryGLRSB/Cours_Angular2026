import { Component } from '@angular/core'
import { PromptList } from './prompts/prompt-list/prompt-list'
import { Navbar } from './prompts/navbar/navbar'
@Component({
  selector: 'app-root',
  imports: [PromptList, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

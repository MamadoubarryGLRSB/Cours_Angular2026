import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { Toast } from 'primeng/toast'
import { Navbar } from './prompts/navbar/navbar'

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Toast, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

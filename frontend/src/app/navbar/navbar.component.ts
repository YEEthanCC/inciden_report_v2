import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  exampleModal: any

  constructor(private router: Router) {}
  onClick() {
    const modalElement = document.getElementById('withScrollExampleModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }

  }
}

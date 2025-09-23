import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  name = signal<string>('');

  ngOnInit() {
    const authData = sessionStorage.getItem('auth');
    const user = JSON.parse(authData!);
    this.name.set(user.name);
  }

  logout() {
    if(confirm('Do you really want to log out of the system?'))
    sessionStorage.removeItem('auth');
    window.location.href = 'pages/authenticate-user'
  }
}

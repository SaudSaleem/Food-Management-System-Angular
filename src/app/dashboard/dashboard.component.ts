import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  longText: string =
    'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.service.logout(this.service.getLoginUser.email).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  createFood() {
    this.router.navigate(['/create-food']);
  }
}

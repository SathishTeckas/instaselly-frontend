import { Component, Input } from '@angular/core';
import { iMenu } from '../../interface/common/menu.interface';
import { menu } from '../../configurations/menu/main.menu';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../controller/authentication/authentication.service';

@Component({
  selector: 'insta-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public menuItems: iMenu[] = menu;
  @Input() isMobile: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  public goto(path: string): void { 
    this.router.navigate([path]);
  }

  public logout(): void {
    this.authService.logout();
  }
}

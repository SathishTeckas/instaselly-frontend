import { Component } from '@angular/core';
import { menu } from '../../configurations/menu/main.menu';
import { iMenu } from '../../interface/common/menu.interface';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {

  public menuItems: iMenu[] = menu;

}

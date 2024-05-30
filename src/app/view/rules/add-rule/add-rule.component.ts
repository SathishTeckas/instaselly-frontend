import { Component } from '@angular/core';

@Component({
  selector: 'add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent {

  public priceBy: string = 'price';
  public operator: string = '';

}

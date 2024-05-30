import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AddRuleComponent } from './add-rule/add-rule.component';


@NgModule({
  declarations: [
    RulesComponent,
    AddRuleComponent
  ],
  imports: [
    CommonModule,
    RulesRoutingModule,
    LibraryModule,
    ComponentsModule
  ]
})
export class RulesModule { }

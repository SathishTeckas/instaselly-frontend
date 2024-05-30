import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AntDesignLibraryModule } from './ant-design-lib.module';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AntDesignLibraryModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    AntDesignLibraryModule,
    FormsModule
  ]
})
export class LibraryModule { }

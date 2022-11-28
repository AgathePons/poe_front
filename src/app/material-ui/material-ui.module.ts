import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Forms UI from material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...MaterialUiModule.materialModules
  ]
})
export class MaterialUiModule {
  public static materialModules = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

  ]
}

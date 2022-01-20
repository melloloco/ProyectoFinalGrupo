import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { PIPES_CALCULADORA } from './pipes/calculadora.pipe';
import { SizerComponent } from './components/sizer.component';
import { MIS_VALIDADORES } from './directives/validadores.directive';
import { ShowDirective, ShowErrorsDirective } from './directives/atributo.directive';
import { UnlessDirective } from './directives/estructurales.directive';



@NgModule({
  declarations: [
    PIPES_CADENAS, PIPES_CALCULADORA, MIS_VALIDADORES, ShowDirective, ShowErrorsDirective, UnlessDirective, SizerComponent,
  ],
  exports: [
    PIPES_CADENAS, PIPES_CALCULADORA, MIS_VALIDADORES, ShowDirective, ShowErrorsDirective, UnlessDirective, SizerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MyCoreModule { }

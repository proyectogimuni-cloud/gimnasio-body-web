import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';


/**
 * Este módulo importa y exporta módulos comunes en todos o la mayoría de módulos, como
 * pueden ser los componentes de primeng, u elementos repetidos en otras librerías de UI a futuro.
 * Tener cuidado de no importar  módulos pesados aquí.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, DialogModule, DropdownModule, MultiSelectModule, CheckboxModule, ButtonModule, SkeletonModule],
  exports: [ToastModule, DialogModule, DropdownModule, MultiSelectModule, CheckboxModule, ButtonModule, SkeletonModule],
})
export class SharedModule {}

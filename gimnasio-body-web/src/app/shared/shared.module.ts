import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, DialogModule, DropdownModule],
  exports: [ToastModule, DialogModule, DropdownModule],
})
export class SharedModule {}

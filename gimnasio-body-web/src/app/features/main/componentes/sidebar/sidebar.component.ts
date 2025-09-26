import { Component } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar.interface';
import { SIDEBAR_MENU_ITEMS } from '../../const/sidebar-menu-items.const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SideBarComponent {
  sidebarMenuItems: SidebarMenuItem[] = SIDEBAR_MENU_ITEMS;
}

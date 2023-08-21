import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
    breadcrumbItem: MenuItem[];
    home: MenuItem;

  constructor() {
    this.breadcrumbItem = [
        { label: 'Quản lý banners' },
        { label: 'Danh sách banners' },
    ];

    this.home = {
        icon: 'pi pi-home',
        routerLink: '/admin/admin-dashboard',
    };
   }

  ngOnInit(): void {
  }

}

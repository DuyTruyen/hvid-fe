import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersRoutingModule } from './banners-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BannersComponent } from './banners.component';


@NgModule({
    declarations: [BannersComponent],
    imports: [
        CommonModule,
        BannersRoutingModule,
        BreadcrumbModule
    ]
})
export class BannersModule { }

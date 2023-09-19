import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersRoutingModule } from './banners-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BannersComponent } from './banners.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MTableModule } from 'src/app/shared/components/m-table/m-table.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PipeModule } from '../../../shared/pipes/pipe.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
    declarations: [BannersComponent],
    imports: [
        CommonModule,
        BannersRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        MTableModule,
        DialogModule,
        ButtonModule,
        PipeModule,
        DropdownModule,
        InputSwitchModule,
    ]
})
export class BannersModule { }

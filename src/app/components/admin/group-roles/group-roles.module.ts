import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRolesComponent } from './group-roles.component';
import { GroupRolesRoutingModule } from './group-roles-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MTableModule } from 'src/app/shared/components/m-table/m-table.module';

import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
    declarations: [GroupRolesComponent],
    imports: [
        MTableModule,
        TableModule,
        InputTextModule,
        RippleModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        GroupRolesRoutingModule,
        ButtonModule,
        BreadcrumbModule
    ],
})
export class GroupRolesModule {}

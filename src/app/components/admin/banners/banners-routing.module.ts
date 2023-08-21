import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannersComponent } from './banners.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BannersComponent }
    ])],
    exports: [RouterModule]
})
export class BannersRoutingModule { }

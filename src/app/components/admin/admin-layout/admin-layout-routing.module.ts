import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { Roles } from 'src/app/shared/constants/constants';
import { AdminLayoutComponent } from './admin.layout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminLayoutComponent,
                children: [
                    {
                        path: 'users',
                        loadChildren: () =>
                            import('../list-users/list-users.module').then(
                                (m) => m.ListUsersModule
                            ),
                        canActivate: [AuthGuard],
                        data: { role: Roles.USER_MANAGE },
                    },
                    {
                        path: 'user-roles',
                        loadChildren: () =>
                            import('../user-roles/user-roles.module').then(
                                (m) => m.UserRolesModule
                            ),
                        canActivate: [AuthGuard],
                        data: { role: Roles.USER_MANAGE },
                    },
                    {
                        path: 'user-groups',
                        loadChildren: () =>
                            import('../user-groups/user-groups.module').then(
                                (m) => m.UserGroupsModule
                            ),
                        canActivate: [AuthGuard],
                        data: { role: Roles.GROUP_MANAGE },
                    },
                    {
                        path: 'group-roles',
                        loadChildren: () =>
                            import('../group-roles/group-roles.module').then(
                                (m) => m.GroupRolesModule
                            ),
                        canActivate: [AuthGuard],
                        data: { role: Roles.GROUP_MANAGE },
                    },
                    {
                        path: 'visit-time',
                        loadChildren: () =>
                            import('../visit-time/visit-time.module').then(
                                (m) => m.VisitTimeModule
                            ),
                        canActivate: [AuthGuard],
                        data: { role: Roles.ADMIN },
                    },
                    {
                        path: 'admin-dashboard',
                        loadChildren: () =>
                            import('../admin-dashboard/admin-dashboard.module').then(
                                (m) => m.AdminDashboardModule
                            )

                    },
                    {
                        path: 'news',
                        loadChildren: () =>
                            import('../news/news.module').then(
                                (m) => m.NewsModule
                            ),
                    },
                    {
                        path: 'appointment',
                        loadChildren: () =>
                            import('../appointment/appointment.module').then(
                                (m) => m.AppointmentModule
                            ),
                    },
                    {
                        path: 'banners',
                        loadChildren: () =>
                            import('../banners/banners.module').then(
                                (m) => m.BannersModule
                            )
                    },


                    { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
                    {
                        path: 'customers',
                        loadChildren: () =>
                            import('../customers/customers.module').then(
                                (m) => m.CustomersModule
                            ),
                    },
                    { path: '', redirectTo: 'customers', pathMatch: 'full' },
                    {
                        path: 'departments',
                        loadChildren: () =>
                            import('../departments/departments.module').then(
                                (m) => m.DepartmentsModule
                            ),
                    },
                    { path: '', redirectTo: 'departments', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AdminLayoutRoutingModule { }

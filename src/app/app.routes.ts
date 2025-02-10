import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCreateComponent } from './flight-create/flight-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

export const routes: Routes = [
    {path: '' , component: FlightSearchComponent},
    {path: 'create', component: FlightCreateComponent},
    {path: 'login', component: UserLoginComponent},
    {path: 'edit/:id', component: FlightCreateComponent},
    {path: 'usersManagement', component : UserManagementComponent},
    {path: 'myProfile', component : UserProfilePageComponent}
];

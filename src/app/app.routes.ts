import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import {ResultComponent} from './result/result.component';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'soal', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'result', component: ResultComponent,  resolve: { data: UserResolver}}

];

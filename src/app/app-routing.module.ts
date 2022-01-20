import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent, PageNotFoundComponent } from './main';
import { RegisterUserComponent } from './security/register-user/register-user.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './security';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent},
  { path: 'catalogo', component: CatalogoComponent, data: {pageTitle:'catalogo'}},
  { path: 'registro', component: RegisterUserComponent, data: {pageTitle:'registro'}},
  { path: 'login', component: LoginComponent, data: {pageTitle:'login'}},
  { path: 'config', loadChildren: () => import('./config/config.module').then(mod => mod.ConfigModule)},
  { path: '404.html', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PizzasAddComponent, PizzasEditComponent, PizzasListComponent, PizzasViewComponent } from './pizzas';
import { HomeComponent, PageNotFoundComponent } from './main';
import { AuthGuard } from './security';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent, data: {pageTitle:'Inicio'}},
  { path: 'catalogo', component: CatalogoComponent, data: {pageTitle:'Catalogo'}},
  { path: 'pizzas', component: PizzasListComponent},
  { path: 'pizzas/add', component: PizzasAddComponent, canActivate: [ AuthGuard ]},
  { path: 'pizzas/:id/edit', component: PizzasEditComponent},
  { path: 'pizzas/:id', component: PizzasViewComponent},
  { path: 'pizzas/:id/:kk', component: PizzasViewComponent},
  { path: 'config', loadChildren: () => import('./config/config.module').then(mod => mod.ConfigModule)},
  { path: '404.html', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

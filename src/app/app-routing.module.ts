import { NgModule } from '@angular/core';

import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemsComponent } from './components/items/items.component';
import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserProfileComponent},
  { path: 'items', component:  ItemsComponent,canActivate:[CanReadGuard]},
  { path: 'admin-panel', component:  AdminPanelComponent,canActivate:[AdminGuard]},
  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
  

];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports:[ RouterModule.forRoot(routes,{
    initialNavigation: 'enabled',
  }) ],
  exports:[
     RouterModule 
    ]
  
})

export class AppRoutingModule { 
  
}
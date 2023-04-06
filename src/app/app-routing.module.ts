import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'crud', component: CrudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

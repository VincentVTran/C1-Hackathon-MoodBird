import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverallPageComponent } from './pages/overall-page/overall-page.component'; 
import { RealtimePageComponent } from './pages/realtime-page/realtime-page.component';
const routes: Routes = [
  { path:'realtime', component: RealtimePageComponent},
  { path:'overall', component: OverallPageComponent},
  { path:'', redirectTo: '/overall', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

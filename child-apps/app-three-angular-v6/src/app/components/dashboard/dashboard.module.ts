import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
      DashboardComponent
  ],
  imports: [
    DashBoardRoutingModule
  ]
})
export class DashBoardModuleTwo { }

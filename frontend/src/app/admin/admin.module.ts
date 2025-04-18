import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { DueDateFormatPipe } from '../due-date-format.pipe';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminReviewComponent,
    DueDateFormatPipe

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }

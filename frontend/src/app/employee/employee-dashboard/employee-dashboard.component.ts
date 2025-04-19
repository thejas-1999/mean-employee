import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: false,
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  employees: any[] = []

  constructor(private adminService: AdminService) {
    this.getEmployeeDetails()
  }

  getEmployeeDetails() {
    this.adminService.fetchEmployees().subscribe((result) => {
      this.employees = result
      console.log(this.employees)
    })

  }

}

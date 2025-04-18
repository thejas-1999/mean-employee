import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  standalone: false,
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  feedbackForm = new FormGroup({
    revieweeName: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required)
  });

}

import { Component } from '@angular/core';
import { ReviewsService } from '../../reviews.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-review',
  standalone: false,
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent {
  reviews: any[] = [];
  employees: any[] = [];
  editMode: boolean = false;
  selectedReviewId: string | null = null;

  reviewForm = new FormGroup({
    reviewee: new FormControl('', [Validators.required]),
    assignedReviewers: new FormArray<FormControl<string | null>>([], [Validators.required]), // Allow string | null
    status: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required])
  });

  constructor(private reviewService: ReviewsService, private adminService: AdminService) {
    this.fetchReviews();
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.adminService.fetchEmployees().subscribe((result) => {
      this.employees = result;
    });
  }

  fetchReviews() {
    this.reviewService.fetchReviews().subscribe((result) => {
      this.reviews = result;
    });
  }

  // Method to get the FormArray
  get assignedReviewers() {
    return (this.reviewForm.get('assignedReviewers') as FormArray<FormControl<string | null>>);
  }

  // Adding/removing reviewers to FormArray
  onReviewerChange(event: any, reviewerId: string) {
    if (event.target.checked) {
      this.assignedReviewers.push(new FormControl(reviewerId)); // Add reviewer to the FormArray
    } else {
      const index = this.assignedReviewers.controls.findIndex(ctrl => ctrl.value === reviewerId);
      if (index !== -1) {
        this.assignedReviewers.removeAt(index); // Remove reviewer from the FormArray
      }
    }
  }

  formSubmit() {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value;

      if (this.editMode && this.selectedReviewId) {
        this.reviewService.editReview(this.selectedReviewId, review).subscribe((result) => {
          console.log('Review updated successfully');
          this.fetchReviews();
          this.reviewForm.reset();
          this.editMode = false;
          this.selectedReviewId = null;
        });
      } else {
        this.reviewService.addReview(review).subscribe((result) => {
          console.log('Review inserted successfully');
          this.fetchReviews();
          this.reviewForm.reset();
        });
      }
    }
  }

  editReview(review: any) {
    this.editMode = true;
    this.selectedReviewId = review._id;
    this.reviewForm.patchValue({
      reviewee: review.reviewee._id,
      status: review.status,
      dueDate: review.dueDate.split('T')[0]
    });

    // Reset the reviewers form array before setting
    this.assignedReviewers.clear();
    review.assignedReviewers.forEach((r: any) => {
      this.assignedReviewers.push(new FormControl(r._id)); // Push to FormArray
    });
  }
}

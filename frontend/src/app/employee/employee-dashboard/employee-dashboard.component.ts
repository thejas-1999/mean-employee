import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ReviewsService } from '../../reviews.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  standalone: false,
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employees: any[] = [];
  reviews: any[] = [];
  selectedReview: any = null;
  feedback: any = { comments: '' };

  constructor(
    private adminService: AdminService,
    private reviewService: ReviewsService
  ) { }

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.adminService.fetchEmployees().subscribe((result) => {
      this.employees = result;
    });
  }

  selectEmployee(employee: any) {
    localStorage.setItem('reviewerId', employee._id);
    this.getReviewsByIds(employee.assignedReviews);
  }

  getReviewsByIds(ids: string[]) {
    const reviewRequests = ids.map(id => this.reviewService.getReviewById(id));
    forkJoin(reviewRequests).subscribe(results => {
      this.reviews = results;
    });
  }

  refreshReviewById(reviewId: string) {
    this.reviewService.getReviewById(reviewId).subscribe(result => {
      const index = this.reviews.findIndex(r => r._id === reviewId);
      if (index > -1) {
        this.reviews[index] = result;
      } else {
        this.reviews.push(result);
      }
    });
  }

  isFeedbackSubmitted(reviewId: string): boolean {
    const review = this.reviews.find(r => r._id === reviewId);
    return review && review.feedback && review.feedback.length > 0;
  }

  submitFeedback() {
    const reviewId = this.selectedReview?._id;
    const reviewerId = localStorage.getItem('reviewerId');
    const revieweeId = this.selectedReview?.reviewee?._id;

    if (!reviewId || !reviewerId || !revieweeId) {
      alert("Missing required fields or review selection.");
      return;
    }

    if (this.isFeedbackSubmitted(reviewId)) {
      alert("Feedback has already been submitted for this review.");
      return;
    }

    const feedbackData = {
      reviewer: reviewerId,
      reviewee: revieweeId,
      comments: this.feedback.comments
    };

    this.reviewService.submitFeedback(reviewId, feedbackData).subscribe(() => {
      alert("Feedback submitted successfully!");
      this.refreshReviewById(reviewId);
      this.feedback.comments = '';
    });
  }
}

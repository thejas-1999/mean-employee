import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private getAllReviewsApi = 'http://localhost:8000/api/reviews/get';
  private createReviewApi = 'http://localhost:8000/api/reviews/add';
  private updateReviewApi = 'http://localhost:8000/api/reviews/update';
  private addFeedbackApi = 'http://localhost:8000/api/reviews/feedbacks'; // API endpoint for feedback submission

  constructor(private http: HttpClient) { }

  fetchReviews() {
    return this.http.get<any[]>(this.getAllReviewsApi);
  }

  getReviewById(id: any) {
    return this.http.get<any>(`${this.getAllReviewsApi}/${id}`);
  }

  addReview(review: any) {
    return this.http.post(this.createReviewApi, review);
  }

  editReview(id: string, updatedData: any) {
    return this.http.put(`${this.updateReviewApi}/${id}`, updatedData);
  }

  // Method to submit feedback
  submitFeedback(reviewId: string, feedbackData: any) {
    return this.http.post(`${this.addFeedbackApi}/${reviewId}`, feedbackData);
  }
}

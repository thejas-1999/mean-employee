import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private getAllReviewsApi = 'http://localhost:8000/api/reviews/get'
  private createReviewApi = 'http://localhost:8000/api/reviews/add'
  private updateReviewApi = 'http://localhost:8000/api/reviews/update'

  constructor(private http: HttpClient) { }

  fetchReviews() {
    return this.http.get<any[]>(this.getAllReviewsApi)
  }

  addReview(review: any) {
    return this.http.post(this.createReviewApi, review)

  }

  editReview(id: string, updatedData: any) {
    return this.http.put(`${this.updateReviewApi}/${id}`, updatedData);
  }
}

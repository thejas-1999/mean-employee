import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private getEmployeeDetailsApi = 'http://localhost:8000/api/employees/get'
  private addEmployeeApi = 'http://localhost:8000/api/employees/add'
  private updateEmployeeApi = 'http://localhost:8000/api/employees/update'
  private deleteEmployeeApi = 'http://localhost:8000/api/employees/delete'
  private addFeedbackApi = 'http://localhost:8000/api/reviews/feedbacks'
  private getFeedbackApi = 'http://localhost:8000/api/reviews/feedbacks'

  constructor(private http: HttpClient) {
    this.fetchEmployees
  }

  fetchEmployees() {
    return this.http.get<any[]>(this.getEmployeeDetailsApi)
  }

  addEmployees(employee: any) {
    return this.http.post(this.addEmployeeApi, employee)

  }

  editEmployee(id: string, updatedData: any) {
    return this.http.put(`${this.updateEmployeeApi}/${id}`, updatedData);
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(`${this.deleteEmployeeApi}/${employeeId}`)
  }

  addFeedback(id: string, updatedData: any) {
    return this.http.put(`${this.addFeedbackApi}/${id}`, updatedData)
  }

  getFeedbacks(id: string) {
    return this.http.get<any[]>(`${this.getFeedbackApi}/${id}`)
  }

}

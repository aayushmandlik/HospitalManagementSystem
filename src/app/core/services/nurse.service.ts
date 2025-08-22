import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nurse } from '../interface/nurse.interface';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  // headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`})

  constructor(private http: HttpClient) { }

  getNurseList():Observable<Nurse[]>{
    return this.http.get<Nurse[]>(`${this.apiUrl}/nurse`)
  }

  addNurse(nurseData: Nurse):Observable<Nurse>{
    return this.http.post<Nurse>(`${this.apiUrl}/nurse`,nurseData)
  }

  updateNurse(nurseData:Nurse):Observable<Nurse>{
    return this.http.put<Nurse>(`${this.apiUrl}/nurse`,nurseData)
  }

  deleteNurse(nurseData: Nurse):Observable<Nurse>{
    return this.http.delete<Nurse>(`${this.apiUrl}/nurse`,{body: nurseData})
  }
}

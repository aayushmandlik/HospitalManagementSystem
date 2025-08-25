import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patients } from '../interface/patients.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getPatientsList():Observable<Patients[]>{
    return this.http.get<Patients[]>(`${this.apiUrl}/patients`)
  }

  addPatients(patientsData: Patients):Observable<Patients>{
    return this.http.post<Patients>(`${this.apiUrl}/patients`,patientsData)
  }

  updatePatients(patientsData:Patients):Observable<Patients>{
    return this.http.put<Patients>(`${this.apiUrl}/patients`,patientsData)
  }

  deletePatients(patientsData: Patients):Observable<Patients>{
    return this.http.delete<Patients>(`${this.apiUrl}/patients`,{body: patientsData})
  }
}

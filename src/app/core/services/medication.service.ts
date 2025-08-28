import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../interface/medication.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getMedicationList():Observable<Medication[]>{
    return this.http.get<Medication[]>(`${this.apiUrl}/medication`)
  }

  addMedication(medicationData: Medication):Observable<Medication>{
    return this.http.post<Medication>(`${this.apiUrl}/medication`,medicationData)
  }

  updateMedication(medicationData:Medication):Observable<Medication>{
    return this.http.put<Medication>(`${this.apiUrl}/medication`,medicationData)
  }

  deleteMedication(medicationData: Medication):Observable<Medication>{
    return this.http.delete<Medication>(`${this.apiUrl}/medication`,{body: medicationData})
  }
}

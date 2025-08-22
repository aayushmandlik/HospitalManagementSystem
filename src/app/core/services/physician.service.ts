import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Physician, PhysicianCreate, PhysicianDelete, PhysicianUpdate } from '../interface/physician.interface';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  // headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`})

  constructor(private http: HttpClient) { }

  getPhysicianList():Observable<Physician[]>{
    return this.http.get<Physician[]>(`${this.apiUrl}/physician`)
  }

  addPhysician(physicianData: PhysicianCreate):Observable<PhysicianCreate>{
    return this.http.post<PhysicianCreate>(`${this.apiUrl}/physician`,physicianData)
  }

  updatePhysician(physicianData:PhysicianUpdate):Observable<PhysicianUpdate>{
    return this.http.put<PhysicianUpdate>(`${this.apiUrl}/physician`,physicianData)
  }

  deletePhysician(physicianData: PhysicianDelete):Observable<PhysicianDelete>{
    return this.http.delete<PhysicianDelete>(`${this.apiUrl}/physician`,{body: physicianData})
  }
}

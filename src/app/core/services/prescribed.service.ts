import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescribed, PrescribedOperation } from '../interface/prescribed.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescribedService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getPrescribedList():Observable<Prescribed[]>{
    return this.http.get<Prescribed[]>(`${this.apiUrl}/prescribed`)
  }

  addPrescribed(prescribedData: PrescribedOperation):Observable<PrescribedOperation>{
    return this.http.post<PrescribedOperation>(`${this.apiUrl}/prescribed`,prescribedData)
  }

  updatePrescribed(prescribedData:PrescribedOperation):Observable<PrescribedOperation>{
    return this.http.put<PrescribedOperation>(`${this.apiUrl}/prescribed`,prescribedData)
  }

  deletePrescribed(prescribedData: PrescribedOperation):Observable<PrescribedOperation>{
    return this.http.delete<PrescribedOperation>(`${this.apiUrl}/prescribed`,{body: prescribedData})
  }
}

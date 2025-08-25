import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnCall, OnCallOperation } from '../interface/onCall.interface';

@Injectable({
  providedIn: 'root'
})
export class OnCallService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getOnCallList():Observable<OnCall[]>{
    return this.http.get<OnCall[]>(`${this.apiUrl}/onCall`)
  }

  addOnCall(onCallData: OnCallOperation):Observable<OnCallOperation>{
    return this.http.post<OnCallOperation>(`${this.apiUrl}/onCall`,onCallData)
  }

  updateOnCall(onCallData:OnCallOperation):Observable<OnCallOperation>{
    return this.http.put<OnCallOperation>(`${this.apiUrl}/onCall`,onCallData)
  }

  deleteOnCall(onCallData: OnCallOperation):Observable<OnCallOperation>{
    return this.http.delete<OnCallOperation>(`${this.apiUrl}/onCall`,{body: onCallData})
  }
}

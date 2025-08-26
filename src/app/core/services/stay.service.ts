import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stay, StayOperation } from '../interface/stay.interface';

@Injectable({
  providedIn: 'root'
})
export class StayService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getStayList():Observable<Stay[]>{
    return this.http.get<Stay[]>(`${this.apiUrl}/stay`)
  }

  addStay(stayData: StayOperation):Observable<StayOperation>{
    return this.http.post<StayOperation>(`${this.apiUrl}/stay`,stayData)
  }

  updateStay(stayData:StayOperation):Observable<StayOperation>{
    return this.http.put<StayOperation>(`${this.apiUrl}/stay`,stayData)
  }

  deleteStay(stayData: StayOperation):Observable<StayOperation>{
    return this.http.delete<StayOperation>(`${this.apiUrl}/stay`,{body: stayData})
  }
}

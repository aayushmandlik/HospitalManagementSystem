import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../interface/procedure.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getProcedureList():Observable<Procedure[]>{
    return this.http.get<Procedure[]>(`${this.apiUrl}/procedure`)
  }

  addProcedure(procedureData: Procedure):Observable<Procedure>{
    return this.http.post<Procedure>(`${this.apiUrl}/procedure`,procedureData)
  }

  updateProcedure(procedureData:Procedure):Observable<Procedure>{
    return this.http.put<Procedure>(`${this.apiUrl}/procedure`,procedureData)
  }

  deleteProcedure(procedureData: Procedure):Observable<Procedure>{
    return this.http.delete<Procedure>(`${this.apiUrl}/procedure`,{body: procedureData})
  }
}

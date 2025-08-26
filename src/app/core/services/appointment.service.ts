import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentOperation } from '../interface/appointment.iterface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getAppointment():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointment`)
  }

  addAppointment(appointmentData: AppointmentOperation):Observable<AppointmentOperation>{
    return this.http.post<AppointmentOperation>(`${this.apiUrl}/appointment`,appointmentData)
  }

  updateAppointment(appointmentData:AppointmentOperation):Observable<AppointmentOperation>{
    return this.http.put<AppointmentOperation>(`${this.apiUrl}/appointment`,appointmentData)
  }

  deleteAppointment(appointmentData: AppointmentOperation):Observable<AppointmentOperation>{
    return this.http.delete<AppointmentOperation>(`${this.apiUrl}/appointment`,{body: appointmentData})
  }
}

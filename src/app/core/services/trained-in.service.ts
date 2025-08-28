import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainedIn, trainedInOperation } from '../interface/trainedin.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainedInService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getTrainedInList():Observable<TrainedIn[]>{
    return this.http.get<TrainedIn[]>(`${this.apiUrl}/trainedin`)
  }

  addTrainedIn(trainedInData: trainedInOperation):Observable<trainedInOperation>{
    return this.http.post<trainedInOperation>(`${this.apiUrl}/trainedin`,trainedInData)
  }

  updateTrainedIn(trainedInData:trainedInOperation):Observable<trainedInOperation>{
    return this.http.put<trainedInOperation>(`${this.apiUrl}/trainedin`,trainedInData)
  }

  deleteTrainedIn(trainedInData: trainedInOperation):Observable<trainedInOperation>{
    return this.http.delete<trainedInOperation>(`${this.apiUrl}/trainedin`,{body: trainedInData})
  }
}

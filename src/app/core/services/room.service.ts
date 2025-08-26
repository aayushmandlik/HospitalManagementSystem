import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, RoomOperation } from '../interface/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getRoomList():Observable<Room[]>{
    return this.http.get<Room[]>(`${this.apiUrl}/room`)
  }

  addRoom(roomData: RoomOperation):Observable<RoomOperation>{
    return this.http.post<RoomOperation>(`${this.apiUrl}/room`,roomData)
  }

  updateRoom(roomData:RoomOperation):Observable<RoomOperation>{
    return this.http.put<RoomOperation>(`${this.apiUrl}/room`,roomData)
  }

  deleteRoom(roomData: RoomOperation):Observable<RoomOperation>{
    return this.http.delete<RoomOperation>(`${this.apiUrl}/room`,{body: roomData})
  }
}

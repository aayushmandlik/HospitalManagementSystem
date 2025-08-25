import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Block } from '../interface/block.interface';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  apiUrl = "https://gdtc-training-api.azurewebsites.net/api/hospital"

  constructor(private http: HttpClient) { }

  getBlockList():Observable<Block[]>{
    return this.http.get<Block[]>(`${this.apiUrl}/block`)
  }

  addBlock(blockData: Block):Observable<Block>{
    return this.http.post<Block>(`${this.apiUrl}/block`,blockData)
  }

  updateBlock(blockData:Block):Observable<Block>{
    return this.http.put<Block>(`${this.apiUrl}/block`,blockData)
  }

  deleteBlock(blockData: Block):Observable<Block>{
    return this.http.delete<Block>(`${this.apiUrl}/block`,{body: blockData})
  }
}

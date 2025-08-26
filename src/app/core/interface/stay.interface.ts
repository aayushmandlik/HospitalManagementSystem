import { Room } from './room.interface';
export interface Stay{
    stayId: number,
    startDateTime: Date,
    endDateTime: Date,
    room: Room
  }

export interface StayOperation{
  stayId?: number,
  patientId?: number,
  roomId?: number,
  startDateTime: Date,
  endDateTime: Date
}

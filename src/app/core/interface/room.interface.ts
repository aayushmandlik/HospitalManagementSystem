import { Block } from './block.interface';
export interface Room{
    roomId?: number,
    roomNumber: number,
    roomType: string,
    availability: boolean,
    createdOn: Date,
    block: Block
  }

  export interface RoomOperation{
  roomId?: number,
  roomNumber: number,
  blockId?: number,
  roomType: string,
  availability: boolean
}

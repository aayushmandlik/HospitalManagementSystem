import { Component, OnInit } from '@angular/core';
import { Room, RoomOperation } from '../../../core/interface/room.interface';
import { BlockService } from '../../../core/services/block.service';
import { RoomService } from '../../../core/services/room.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Block } from '../../../core/interface/block.interface';

@Component({
  selector: 'app-room-list',
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {
  roomList: Room[] = []
  blockList: Block[] = []
  dataSource = new MatTableDataSource<Room>()
  displayColumns = ['roomId','roomNumber','roomType','availability','createdOn','blockFloor','blockCode','actions']
  roomForm: FormGroup

  isEdit = false
  trueValue:boolean = true
  falseValue: boolean = false

  currentRoomId?: number = 0

  constructor(private roomService:RoomService, private blockService: BlockService, private fb: FormBuilder){
    this.roomForm = this.fb.group({
      roomNumber: [null, Validators.required],
      blockId: [null,Validators.required],
      roomType: [null,Validators.required],
      availability: [true,Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadBlock();
  }

  loadRooms(){
    this.roomService.getRoomList().subscribe((data)=>{
      this.roomList = data
      this.dataSource.data = this.roomList
      console.log(this.dataSource.data);
    })
  }

  loadBlock(){
    this.blockService.getBlockList().subscribe((data)=>{
      this.blockList = data
    })
  }

  addRoom(){
    const formData = this.roomForm.value
    const RoomData: RoomOperation = {
      roomId: this.isEdit ? this.currentRoomId : 0,
      roomNumber: formData.roomNumber,
      roomType: formData.roomType,
      availability: formData.availability,
      blockId: formData.blockId
    }
    if(this.isEdit){
      this.roomService.updateRoom(RoomData).subscribe(()=>{
        this.loadRooms();
        this.roomForm.reset()
      })
    }
    else{
      this.roomService.addRoom(RoomData).subscribe(()=>{
        this.loadRooms()
        this.roomForm.reset()
      })
    }
  }

  editRoom(roomData: Room){
    this.currentRoomId = roomData.roomId
    this.roomForm.patchValue({
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType,
      blockId: roomData.block.blockId,
      availability: roomData.availability
    })
    this.isEdit = true
  }

  deleteRoom(roomData: Room){
    const deleteData: RoomOperation = {
      roomId: roomData.roomId,
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType,
      blockId: roomData.block.blockId,
      availability: roomData.availability
    }
    if(confirm('Are you sure, You want to delete?')){
      this.roomService.deleteRoom(deleteData).subscribe(()=>{
        this.loadRooms();
      })
    }
  }


}

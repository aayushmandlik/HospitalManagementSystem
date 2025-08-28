import { Component, OnInit } from '@angular/core';
import { Stay, StayOperation } from '../../../core/interface/stay.interface';
import { Room } from '../../../core/interface/room.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StayService } from '../../../core/services/stay.service';
import { RoomService } from '../../../core/services/room.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { PatientsService } from '../../../core/services/patients.service';
import { Patients } from '../../../core/interface/patients.interface';


@Component({
  selector: 'app-stay-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './stay-list.component.html',
  styleUrl: './stay-list.component.css'
})
export class StayListComponent implements OnInit {
  stayList: Stay[] = []
  roomList: Room[] = []
  patientList: Patients[] = []
  dataSource = new MatTableDataSource<Stay>()
  displayColumns = ['stayId','startDateTime','endDateTime','blockFloor','blockCode','roomNumber','roomType','actions']
  stayForm!: FormGroup

  isEdit = false

  currentStayId?: number = 0

  constructor(private stayService:StayService, private roomService: RoomService,private patientService: PatientsService, private fb: FormBuilder){
    this.stayForm = this.fb.group({
      patientId: [null, Validators.required],
      roomId: [null,Validators.required],
      startDateTime: [null,Validators.required],
      endDateTime: [null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadStay()
    this.loadRooms()
    this.loadPatients()
  }

  loadStay(){
    this.stayService.getStayList().subscribe((data)=>{
      this.stayList = data
      this.dataSource.data = this.stayList
      console.log(this.dataSource.data);
    })
  }

  loadRooms(){
    this.roomService.getRoomList().subscribe((data)=>{
      this.roomList = data
    })
  }

  loadPatients(){
    this.patientService.getPatientsList().subscribe((data)=>{
      this.patientList = data
    })
  }

  addStay(){
      const formData = this.stayForm.value
      const stayData: StayOperation = {
        stayId: this.isEdit ? this.currentStayId : 0,
        patientId: formData.patientId,
        roomId: formData.roomId,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime
      }
      if(this.isEdit){
        this.stayService.updateStay(stayData).subscribe(()=>{
          this.loadStay();
          this.stayForm.reset()
        })
      }
      else{
        this.stayService.addStay(stayData).subscribe(()=>{
          this.loadStay()
          this.stayForm.reset()
        })
      }
  }

  editStay(stayData: Stay){
    this.currentStayId = stayData.stayId
    this.stayForm.patchValue({
      roomId: stayData.room.roomId,
      startDateTime: stayData.startDateTime,
      endDateTime: stayData.endDateTime
    })
    this.isEdit = true
  }

  // deleteStay(stayData: Stay){
  //   if(confirm('Are You Sure, You Want to Delete ?'))
  //   {
  //     const deleteData: StayOperation = {
  //       stayId: stayData.stayId,
  //       patientId

  //     }
  //   }
  // }

}

import { Nurse } from './../../../core/interface/nurse.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OnCall, OnCallOperation } from '../../../core/interface/onCall.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnCallService } from '../../../core/services/on-call.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NurseService } from '../../../core/services/nurse.service';
import { BlockService } from '../../../core/services/block.service';
import { Block } from '../../../core/interface/block.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-on-call-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './on-call-list.component.html',
  styleUrl: './on-call-list.component.css'
})
export class OnCallListComponent implements OnInit {
  onCallList: OnCall[] = []
  nurseList: Nurse[] = []
  blockList: Block[] = []
  dataSource = new MatTableDataSource<OnCall>()
  displayColumns = ['onCallId','nurseId','name','blockId','blockFloor','blockCode','onCallStart','onCallEnd','actions']
  onCallForm!: FormGroup
  currentOnCall: OnCall = {
    onCallId: 0,
    nurse: {
      name: '',
      position: '',
      registered: true
    },
    block: {
      blockFloor: 0,
      blockCode: 0
    },
    onCallStart: new Date(),
    onCallEnd: new Date()

  }
  isEdit = false

  searchTerm: string = ""

  constructor(private onCallService: OnCallService,private nurseService: NurseService,private blockService: BlockService, private fb: FormBuilder){
    this.onCallForm = this.fb.group({
      nurse: [null,Validators.required],
      block: [null,Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadOnCall()
    this.loadNurse()
    this.loadBlock()
  }


  loadOnCall(){
    this.onCallService.getOnCallList().subscribe((data)=>{
      this.onCallList = data
      this.dataSource.data = data
      console.log(this.onCallList);

    })
  }

  loadNurse(){
    this.nurseService.getNurseList().subscribe((data)=>{
      this.nurseList = data
      console.log(this.nurseList);
    })
  }

  loadBlock(){
    this.blockService.getBlockList().subscribe((data)=>{
      this.blockList = data
      console.log(this.blockList);

    })
  }

  addOnCall(){
    const formData = this.onCallForm.value
    console.log(formData);
    const onCallData: OnCallOperation = {
      onCallId: this.isEdit ? this.currentOnCall.onCallId : 0,
      nurseId: formData.nurse,
      blockId: formData.block,
      onCallStart: new Date(formData.start),
      onCallEnd: new Date(formData.end)
    }

    if(this.isEdit){
      // const updateOnCall: OnCallOperation = {...this.currentOnCall,...formData}
      this.onCallService.updateOnCall(onCallData).subscribe(()=>{
        this.loadOnCall()
        this.onCallForm.reset()
        this.isEdit=false
      })
    }
    else
    {
      // const onCallData: OnCallOperation = {
      //   onCallId: 0,
      //   nurseId: formData.nurse,
      //   blockId: formData.block,
      //   onCallStart: new Date(formData.start),
      //   onCallEnd: new Date(formData.end)
      // }
      console.log('Call Data',onCallData);

      this.onCallService.addOnCall(onCallData).subscribe(()=>{
        this.loadOnCall()
        this.onCallForm.reset()
      })
    }
  }

  editOnCall(oncallData: OnCall){
    this.currentOnCall = {...oncallData}
    this.onCallForm.patchValue({
      nurse : oncallData.nurse.nurseId,
      block: oncallData.block.blockId,
      start: new Date(oncallData.onCallStart),
      end: new Date(oncallData.onCallEnd)
    })
    this.isEdit=true
  }

  deleteOnCall(onCallData: OnCall){
    if(confirm(`Are you Sure, You want to delete ${onCallData.onCallId}`)){
      console.log(onCallData);

      const deleteData: OnCallOperation = {
        onCallId: onCallData.onCallId,
        nurseId: onCallData.nurse.nurseId,
        blockId: onCallData.block.blockId,
        onCallStart: onCallData.onCallStart,
        onCallEnd: onCallData.onCallEnd
      }

      this.onCallService.deleteOnCall(deleteData).subscribe(()=>{
      this.loadOnCall()
    })
    }
  }

}

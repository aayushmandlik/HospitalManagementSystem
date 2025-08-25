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
import { NurseListComponent } from '../../nurse/nurse-list/nurse-list.component';
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
  displayColumns = ['onCallId','nurseId','name','blockId','blockCode','onCallStart','onCallEnd']
  onCallForm!: FormGroup
  currentOnCall: OnCallOperation = {
    onCallId: 0,
    nurseId: 0,
    blockId: 0,
    onCallStart: new Date(),
    onCallEnd: new Date()

  }
  isEdit = false
  selectedNurse = 'None';
  selectedBlock = 'None';
  searchTerm: string = ""
  nurseSelected = {}
  blockSelected = {}

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

  selectNurse(nurse: Nurse){
    this.nurseSelected = nurse
    console.log(this.nurseSelected)
  }

  selectBlock(block: Block){
    this.blockSelected = block
    console.log(this.blockSelected);
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

    // if(this.isEdit){
    //   const updateOnCall: OnCallOperation = {...this.currentOnCall,...formData}
    //   this.onCallService.updateOnCall(updateOnCall).subscribe(()=>{
    //     this.loadOnCall()
    //     this.onCallForm.reset()
    //     this.isEdit=false
    //   })
    // }
    // else
    // {
      const onCallData: OnCallOperation = {
        onCallId: 0,
        nurseId: formData.nurse,
        blockId: formData.block,
        onCallStart: new Date(formData.start),
        onCallEnd: new Date(formData.end)
      }
      console.log('Call Data',onCallData);

      this.onCallService.addOnCall(onCallData).subscribe(()=>{
        this.loadOnCall()
        this.onCallForm.reset()
      })
    // }
  }

  // editBlock(blockData: Block){
  //   this.currentBlock = {...blockData}
  //   this.blockForm.patchValue({
  //     blockFloor : blockData.blockFloor,
  //     blockCode: blockData.blockCode
  //   })
  //   this.isEdit=true
  // }

  // deleteBlock(blockData: Block){
  //   if(confirm(`Are you Sure, You want to delete ${blockData.blockCode}`)){
  //     this.blockService.deleteBlock(blockData).subscribe(()=>{
  //     this.loadBlock()
  //   })
  //   }
  // }
}

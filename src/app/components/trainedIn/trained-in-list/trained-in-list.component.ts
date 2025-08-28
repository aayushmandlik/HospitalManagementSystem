import { Component, OnInit } from '@angular/core';
import { TrainedIn, trainedInOperation } from '../../../core/interface/trainedin.interface';
import { Procedure } from '../../../core/interface/procedure.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainedInService } from '../../../core/services/trained-in.service';
import { ProcedureService } from '../../../core/services/procedure.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Physician } from '../../../core/interface/physician.interface';
import { PhysicianService } from '../../../core/services/physician.service';

@Component({
  selector: 'app-trained-in-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './trained-in-list.component.html',
  styleUrl: './trained-in-list.component.css'
})
export class TrainedInListComponent implements OnInit {
  trainedInList: TrainedIn[] = []
  physicianList: Physician[] = []
  procedureList:Procedure[] = []
  dataSource = new MatTableDataSource<TrainedIn>()
  displayColumns = ['trainedInId','physicianId','physicianName','certificationDate','certificationExpires','treatmentName','createdOn','actions']
  currentTrainedInId?:number = 0
  isEdit = false

  trainedInForm: FormGroup

  constructor(private trainedInService: TrainedInService,private physicianService: PhysicianService, private procedureService: ProcedureService,private fb: FormBuilder){
    this.trainedInForm = this.fb.group({
      physician: [null,Validators.required],
      treatment: [null,Validators.required],
      certificationDate: [null,Validators.required],
      certificationExpires: [null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadTrainedIn(),
    this.loadPhysician(),
    this.loadTreatment()
  }

  loadTrainedIn(){
    this.trainedInService.getTrainedInList().subscribe((data)=>{
      this.trainedInList = data;
      this.dataSource.data = this.trainedInList
      console.log(this.dataSource.data);

    })
  }

  loadPhysician(){
    this.physicianService.getPhysicianList().subscribe((data)=>{
      this.physicianList = data
    })
  }

  loadTreatment(){
    this.procedureService.getProcedureList().subscribe((data)=>{
      this.procedureList = data
    })
  }

  addTrainedIn(){
    const formData = this.trainedInForm.value
    const trainedInData: trainedInOperation = {
      id: this.isEdit ? this.currentTrainedInId : 0,
      physician: formData.physician,
      treatment: formData.treatment,
      certificationDate: formData.certificationDate,
      certificationExpires: formData.certificationExpires
    }

    if(this.isEdit){
      this.trainedInService.updateTrainedIn(trainedInData).subscribe(()=>{
        this.loadTrainedIn()
        this.trainedInForm.reset()
        this.isEdit = false
      })
    }
    else{
      this.trainedInService.addTrainedIn(trainedInData).subscribe(()=>{
        this.loadTrainedIn()
        this.trainedInForm.reset()
      })
    }
  }

  editTrainedIn(trainedInData: TrainedIn){
    this.currentTrainedInId = trainedInData.trainedInId
    this.trainedInForm.patchValue({
      physician: trainedInData.physicianId,
      treatment: trainedInData.treatment.procedureId,
      certificationDate: trainedInData.certificationDate,
      certificationExpires: trainedInData.certificationExpires
    })
    this.isEdit = true
  }

  deleteTrainedIn(trainedInData: TrainedIn){
    if(confirm('Are you Sure, You want to delete?')){
      const deleteData: trainedInOperation = {
        id: trainedInData.trainedInId,
        physician: trainedInData.physicianId,
        treatment: trainedInData.treatment.procedureId,
        certificationDate: trainedInData.certificationDate,
        certificationExpires: trainedInData.certificationExpires
      }

      this.trainedInService.deleteTrainedIn(deleteData).subscribe(()=>{
        this.loadTrainedIn()
      })
    }
  }


}

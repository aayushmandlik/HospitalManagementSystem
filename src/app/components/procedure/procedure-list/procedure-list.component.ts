import { Component, OnInit } from '@angular/core';
import { Procedure } from '../../../core/interface/procedure.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProcedureService } from '../../../core/services/procedure.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-procedure-list',
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './procedure-list.component.html',
  styleUrl: './procedure-list.component.css'
})
export class ProcedureListComponent implements OnInit{
  procedureList: Procedure[] = []
  dataSource = new MatTableDataSource<Procedure>()
  displayColumns = ['procedureId','name','cost','createdOn','actions']
  procedureForm: FormGroup
  currentProcedureId?:number = 0

  isEdit = false

  constructor(private procedureService: ProcedureService,private fb: FormBuilder){
    this.procedureForm = this.fb.group({
      name: [null,Validators.required],
      cost: [0,Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadProcedure()
  }

  loadProcedure(){
    this.procedureService.getProcedureList().subscribe((data)=>{
      this.procedureList = data
      this.dataSource.data = this.procedureList
      console.log(this.dataSource.data);

    })
  }

  addProcedure(){
    const formData = this.procedureForm.value;
    const procedureData: Procedure = {
      procedureId: this.isEdit ? this.currentProcedureId : 0,
      name: formData.name,
      cost: formData.cost
    }
    if(this.isEdit){
      this.procedureService.updateProcedure(procedureData).subscribe(()=>{
        this.loadProcedure()
        this.procedureForm.reset()
        this.isEdit = false
      })
    }
    else{
      this.procedureService.addProcedure(procedureData).subscribe(()=>{
        this.loadProcedure()
        this.procedureForm.reset()
      })
    }
  }

  editProcedure(procedureData: Procedure){
    this.currentProcedureId = procedureData.procedureId
    this.procedureForm.patchValue({
      name: procedureData.name,
      cost: procedureData.cost
    })
    this.isEdit = true
  }

  deleteProcedure(procedureData: Procedure){
    if(confirm('Are You Sure, You want to delete ?'))
    {
      this.procedureService.deleteProcedure(procedureData).subscribe(()=>{
        this.loadProcedure()
      })
    }
  }
}

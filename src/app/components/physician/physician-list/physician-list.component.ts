import { Component, OnInit } from '@angular/core';
import { PhysicianService } from '../../../core/services/physician.service';
import { Physician, PhysicianCreate, PhysicianDelete, PhysicianUpdate } from '../../../core/interface/physician.interface';
import {MatTableModule} from '@angular/material/table'
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-physician-list',
  imports: [MatTableModule,FormsModule,ReactiveFormsModule,MatFormField,MatInput,MatButton,MatLabel],
  templateUrl: './physician-list.component.html',
  styleUrl: './physician-list.component.css'
})
export class PhysicianListComponent implements OnInit {
  physicianList: Physician[] = []
  dataSource = new MatTableDataSource<Physician>()
  displayColumns = ['physicianId','name','position','actions']
  physicianForm: FormGroup
  currentPhysician: PhysicianUpdate = {
    id: 0,
    name: '',
    position: ''
  }
  isEdit = false

  constructor(private physicianService: PhysicianService, private fb: FormBuilder){
    this.physicianForm = this.fb.group({
      name: ['',Validators.required],
      position: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadPhysician()
  }

  loadPhysician(){
    this.physicianService.getPhysicianList().subscribe((data)=>{
      this.physicianList = data
      this.dataSource.data = data
      console.log(this.physicianList);

    })
  }

  addPhysician(){
    const formData = this.physicianForm.value
    if(this.isEdit){
      const updatePhysician: PhysicianUpdate = {...this.currentPhysician,...formData}
      this.physicianService.updatePhysician(updatePhysician).subscribe(()=>{
        this.loadPhysician()
        this.physicianForm.reset()
        this.isEdit=false
      })
    }
    else{
      const physicianData: PhysicianCreate = {...formData}
      this.physicianService.addPhysician(physicianData).subscribe(()=>{
        this.loadPhysician()
        this.physicianForm.reset()
      })
    }
  }

  editPhysician(physician: PhysicianUpdate){
    this.currentPhysician = {...physician}
    this.physicianForm.patchValue({
      name : physician.name,
      position: physician.position
    })
    this.isEdit=true
  }

  deletePhysician(physician: PhysicianDelete){
    this.physicianService.deletePhysician(physician).subscribe(()=>{
      this.loadPhysician()
    })
  }
}

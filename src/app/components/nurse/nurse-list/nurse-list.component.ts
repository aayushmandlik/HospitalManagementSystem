import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../../core/services/nurse.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Nurse } from '../../../core/interface/nurse.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nurse-list',
  imports: [MatTableModule,MatToolbarModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './nurse-list.component.html',
  styleUrl: './nurse-list.component.css'
})
export class NurseListComponent implements OnInit{

  nurseList: Nurse[] = []
  isEdit = false
  searchTerm: string = ""
  nurseForm!: FormGroup
  dataSource = new MatTableDataSource<Nurse>()
  displayColumns = ['nurseId','name','position','registered','createdOn','actions']
  currentNurse: Nurse = {
    nurseId : 0,
    name: '',
    position: '',
    registered: true
  }
  constructor(private nurseService: NurseService, private fb: FormBuilder){
    this.nurseForm = fb.group({
      name: ['',Validators.required],
      position: ['',Validators.required],
      registered: [true]
    })
  }
  ngOnInit(): void {
    this.loadNurse()
  }

  loadNurse(){
    this.nurseService.getNurseList().subscribe((data)=>{
      this.nurseList = data
      this.dataSource.data = data
      console.log(this.nurseList);

    })
  }

  onSubmit(){
    if(this.isEdit){
      const updateNurseData: Nurse = {...this.currentNurse,...this.nurseForm.value}
      this.nurseService.updateNurse(updateNurseData).subscribe(()=>{
        this.loadNurse()
        this.isEdit = false
        this.nurseForm.reset()
      })
    }
    else{
      const addNurseData: Nurse = {...this.nurseForm.value}
      this.nurseService.addNurse(addNurseData).subscribe(()=>{
        this.loadNurse()
        this.nurseForm.reset()
      })
    }

  }

  editNurse(nurseData: Nurse){
    this.currentNurse = {...nurseData}
    this.nurseForm.patchValue({
      name: nurseData.name,
      position: nurseData.position,
    })
    this.isEdit = true

  }

  deleteNurse(nurseData: Nurse){
    if(confirm(`Are You Sure, You want to delete ${nurseData.name}?`))
    this.nurseService.deleteNurse(nurseData).subscribe(()=>{
      this.loadNurse()
    })

  }

   onSearch(event: Event){
    const searchInput = event.target as HTMLInputElement
    this.searchTerm = searchInput.value
    this.dataSource.data = this.nurseList.filter((data) => {
      return data.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || data.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    })

  }


}

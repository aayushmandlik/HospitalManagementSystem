import { Component } from '@angular/core';
import { Patients } from '../../../core/interface/patients.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsService } from '../../../core/services/patients.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-patients-list',
  imports: [MatTableModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatLabel, MatToolbarModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css'
})
export class PatientsListComponent {
  patientsList: Patients[] = []
  dataSource = new MatTableDataSource<Patients>()
  displayColumns = ['patientId','name','address','phone','createdOn','actions']
  patientsForm!: FormGroup
  currentPatient: Patients = {
    patientId: 0,
    name: '',
    address: '',
    phone: ''
  }
  isEdit = false
  searchTerm: string = ""

  constructor(private patientsService: PatientsService, private fb: FormBuilder){
    this.patientsForm = this.fb.group({
      name: ['',Validators.required],
      address: ['',Validators.required],
      phone: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadPatients()
  }

  loadPatients(){
    this.patientsService.getPatientsList().subscribe((data)=>{
      this.patientsList = data
      this.dataSource.data = data
      console.log(this.patientsList);

    })
  }

  addPatient(){
    const formData = this.patientsForm.value
    if(this.isEdit){
      const updatePatient: Patients = {...this.currentPatient,...formData}
      this.patientsService.updatePatients(updatePatient).subscribe(()=>{
        this.loadPatients()
        this.patientsForm.reset()
        this.isEdit=false
      })
    }
    else{
      const patientsData: Patients = {...formData}
      this.patientsService.addPatients(patientsData).subscribe(()=>{
        this.loadPatients()
        this.patientsForm.reset()
      })
    }
  }

  editPatient(patientsData: Patients){
    this.currentPatient = {...patientsData}
    this.patientsForm.patchValue({
      name : patientsData.name,
      address: patientsData.address,
      phone: patientsData.phone
    })
    this.isEdit=true
  }

  deletePatient(patientData: Patients){
    if(confirm(`Are You Sure, You want to delete ${patientData.name}`)){
      this.patientsService.deletePatients(patientData).subscribe(()=>{
      this.loadPatients()
    })
    }
  }


  onSearch(event: Event){
    const searchInput = event.target as HTMLInputElement
    this.searchTerm = searchInput.value
    this.dataSource.data = this.patientsList.filter((data) => {
      return data.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })

  }
}

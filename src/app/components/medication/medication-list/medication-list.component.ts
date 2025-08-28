import { Component } from '@angular/core';
import { Medication } from '../../../core/interface/medication.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicationService } from '../../../core/services/medication.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medication-list',
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.css'
})
export class MedicationListComponent {
  medicationList: Medication[] = []
  dataSource = new MatTableDataSource<Medication>()
  displayColumns = ['medicationId','name','brand','description','createdDate','actions']
  medicationForm: FormGroup
  currentMedicationId?:number = 0

  isEdit = false

  constructor(private medicationService: MedicationService,private fb: FormBuilder){
    this.medicationForm = this.fb.group({
      name: [null,Validators.required],
      brand: [null,Validators.required],
      description: [null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadMedication()
  }

  loadMedication(){
    this.medicationService.getMedicationList().subscribe((data)=>{
      this.medicationList = data
      this.dataSource.data = this.medicationList
      console.log(this.dataSource.data);

    })
  }

  addMedication(){
    const formData = this.medicationForm.value;
    const medicationData: Medication = {
      medicationId: this.isEdit ? this.currentMedicationId : 0,
      name: formData.name,
      brand: formData.brand,
      description: formData.description
    }
    if(this.isEdit){
      this.medicationService.updateMedication(medicationData).subscribe(()=>{
        this.loadMedication()
        this.medicationForm.reset()
        this.isEdit = false
      })
    }
    else{
      this.medicationService.addMedication(medicationData).subscribe(()=>{
        this.loadMedication()
        this.medicationForm.reset()
      })
    }
  }

  editMedication(medicationData: Medication){
    this.currentMedicationId = medicationData.medicationId
    this.medicationForm.patchValue({
      name: medicationData.name,
      brand: medicationData.brand,
      description: medicationData.description
    })
    this.isEdit = true
  }

  deleteMedication(medicationData: Medication){
    if(confirm('Are You Sure, You want to delete ?'))
    {
      this.medicationService.deleteMedication(medicationData).subscribe(()=>{
        this.loadMedication()
      })
    }
  }
}

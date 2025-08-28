import { Component, OnInit } from '@angular/core';
import { Prescribed, PrescribedOperation } from '../../../core/interface/prescribed.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Physician } from '../../../core/interface/physician.interface';
import { Medication } from '../../../core/interface/medication.interface';
import { PrescribedService } from '../../../core/services/prescribed.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhysicianService } from '../../../core/services/physician.service';
import { MedicationService } from '../../../core/services/medication.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Patients } from '../../../core/interface/patients.interface';
import { PatientsService } from '../../../core/services/patients.service';
import { Appointment } from '../../../core/interface/appointment.iterface';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-prescribed-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './prescribed-list.component.html',
  styleUrl: './prescribed-list.component.css'
})
export class PrescribedListComponent implements OnInit {
  prescribedList: Prescribed[] = []
  physicianList: Physician[] = []
  patientList: Patients[] = []
  medicationList: Medication[] = []
  appointmentList: Appointment[] = []
  dataSource = new MatTableDataSource<Prescribed>()
  displayColumns = ['prescribedId','patientName','phone','appointmentDate','physicianName','dose','medicationName','createdOn']
  prescribedForm: FormGroup
  currentPrescribedId?:number = 0

  isEdit = false

  constructor(private prescribedService: PrescribedService,private patientService: PatientsService, private physicianService: PhysicianService, private medicatoinService: MedicationService,private appointmentService: AppointmentService, private fb: FormBuilder){
    this.prescribedForm = this.fb.group({
      physician: [null,Validators.required],
      patient: [null,Validators.required],
      medication: [null,Validators.required],
      date: [new Date()],
      appointment: [null,Validators.required],
      dose: [null,Validators.required]
    })
  }


  ngOnInit(): void {
    this.loadPrescribed(),
    this.loadPatient(),
    this.loadPhysician(),
    this.loadMedication(),
    this.loadAppointment()
  }

  loadPrescribed(){
    this.prescribedService.getPrescribedList().subscribe((data)=>{
      this.prescribedList = data
      this.dataSource.data =  this.prescribedList
      console.log(this.dataSource.data);

    })
  }

  loadPhysician(){
    this.physicianService.getPhysicianList().subscribe((data)=>{
      this.physicianList = data
    })
  }

  loadPatient(){
    this.patientService.getPatientsList().subscribe((data)=>{
      this.patientList = data
    })
  }

  loadMedication(){
    this.medicatoinService.getMedicationList().subscribe((data)=>{
      this.medicationList = data
    })
  }

  loadAppointment(){
    this.appointmentService.getAppointment().subscribe((data)=>{
      this.appointmentList = data
    })
  }


  addPrescribed(){
    const formData = this.prescribedForm.value
    const prescribedData: PrescribedOperation = {
      physician: formData.physician,
      patient: formData.patient,
      medication: formData.medication,
      date: formData.date,
      appointment: formData.appointment,
      dose: formData.dose
    }

    if(this.isEdit){
      this.prescribedService.updatePrescribed(prescribedData).subscribe(()=>{
        this.loadPrescribed()
        this.prescribedForm.reset()
      })
    }
    else{
      this.prescribedService.addPrescribed(prescribedData).subscribe(()=>{
        this.loadPrescribed()
        this.prescribedForm.reset()
      })
    }
  }

  editPrescribed(prescribedData: Prescribed){
    this.currentPrescribedId  = prescribedData.prescribedId
    this.prescribedForm.patchValue({
      physician: prescribedData.physician.physicianId,
      patient: prescribedData.patientId,
      medication: prescribedData.medication.medicationId,
      date: prescribedData.createdOn,
      dose: prescribedData.dose
    })

    this.isEdit = true
  }


}

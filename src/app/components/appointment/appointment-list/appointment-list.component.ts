import { Component, OnInit } from '@angular/core';
import { OnCall } from '../../../core/interface/onCall.interface';
import { Patients } from '../../../core/interface/patients.interface';
import { Physician } from '../../../core/interface/physician.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { OnCallService } from '../../../core/services/on-call.service';
import { PatientsService } from '../../../core/services/patients.service';
import { PhysicianService } from '../../../core/services/physician.service';
import { Appointment, AppointmentOperation } from '../../../core/interface/appointment.iterface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-appointment-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointmentList: Appointment[] = []
  onCallList: OnCall[] = []
  patientList: Patients[] = []
  physicianList: Physician[] = []
  dataSource = new MatTableDataSource<Appointment>()
  displayColumns = ['appointmentId','starDateTime','endDateTime','createdOn','patientId','patientName','physicianId','physicianName','nurseName','actions']
  appointmentForm!: FormGroup

  isEdit = false

  searchTerm: string = ''
  filteredPatients: Patients[] = []
  filteredPhysicians: Physician[] = []

  currentAppointmentId:number = 0

  constructor(private appointmentService: AppointmentService, private fb: FormBuilder, private oncallService: OnCallService, private patientService: PatientsService,private physicianService: PhysicianService){
    this.appointmentForm = this.fb.group({
      onCallId: [null,Validators.required],
      patientId: [null,Validators.required],
      physicianId: [null,Validators.required],
      startDateTime: [null,Validators.required],
      endDateTime: [null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadOnCall();
    this.loadPatients();
    this.loadPhysicians();
  }

  loadAppointments(){
    this.appointmentService.getAppointment().subscribe((data)=>{
      this.appointmentList = data
      this.dataSource.data = this.appointmentList
    })
  }

  loadOnCall(){
    this.oncallService.getOnCallList().subscribe((data)=>{
      this.onCallList = data
    })
  }

  loadPatients(){
    this.patientService.getPatientsList().subscribe((data)=>{
      this.patientList = data
      this.filteredPatients = this.patientList
    })
  }

  loadPhysicians(){
    this.physicianService.getPhysicianList().subscribe((data)=>{
      this.physicianList = data
      this.filteredPhysicians = this.physicianList
    })
  }

  addAppointment(){
    const formData = this.appointmentForm.value
    const appointmentData: AppointmentOperation = {
      appointmentId: this.isEdit ? this.currentAppointmentId: 0,
      onCallId: formData.onCallId,
      patientId: formData.patientId,
      physicianId: formData.physicianId,
      startDateTime: formData.startDateTime,
      endDateTime: formData.endDateTime
    }
    if(this.isEdit){
      this.appointmentService.updateAppointment(appointmentData).subscribe(()=>{
        this.loadAppointments();
        this.appointmentForm.reset();
        this.isEdit = false
      })
    }
    else{
      this.appointmentService.addAppointment(appointmentData).subscribe(()=>{
        this.loadAppointments()
        this.appointmentForm.reset()
      })
    }
  }

  editAppointment(appointmentData: Appointment){
    this.currentAppointmentId = appointmentData.appointmentId
    console.log(this.currentAppointmentId);
    this.appointmentForm.patchValue({
      onCallId: appointmentData.prepNurse.onCallId,
      patientId: appointmentData.patient.patientId,
      physicianId: appointmentData.physician.physicianId,
      startDateTime: appointmentData.starDateTime,
      endDateTime: appointmentData.endDateTime
    })
    this.isEdit = true
  }

  deleteAppointment(appointmentData: Appointment){
    if(confirm('Are You Sure, You want to delete appointment')){
      const deleteData: AppointmentOperation = {
        appointmentId: appointmentData.appointmentId,
        patientId: appointmentData.patient.patientId,
        physicianId: appointmentData.physician.physicianId,
        onCallId: appointmentData.prepNurse.onCallId,
        startDateTime: appointmentData.starDateTime,
        endDateTime: appointmentData.endDateTime
      }

      this.appointmentService.deleteAppointment(deleteData).subscribe(()=>{
        this.loadAppointments()
      })
    }
  }

  onSearchPatients(event: Event){
    const searchInput = event.target as HTMLInputElement
    this.searchTerm = searchInput.value
    this.filteredPatients = this.patientList.filter((data) => {
      return data.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
  }

   onSearchPhysician(event: Event){
    const searchInput = event.target as HTMLInputElement
    this.searchTerm = searchInput.value
    this.filteredPhysicians = this.physicianList.filter((data) => {
      return data.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
  }

}

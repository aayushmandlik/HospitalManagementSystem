import { OnCall } from "./onCall.interface"
import { Patients } from "./patients.interface"
import { Physician } from "./physician.interface"

export interface Appointment{
    appointmentId: number,
    starDateTime: Date,
    endDateTime: Date,
    createdOn: Date,
    patient: Patients,
    physician: Physician,
    prepNurse: OnCall
}

export interface AppointmentOperation{
  appointmentId: number,
  patientId?: number,
  physicianId?: number,
  onCallId?: number,
  startDateTime: Date,
  endDateTime: Date
}

import { Medication } from './medication.interface';
import { Physician } from './physician.interface';

export interface Prescribed{
    prescribedId?: number,
    patientId?: number,
    patientName: string,
    phone: string,
    appointmentDate: Date,
    dose: string,
    createdOn: Date,
    physician: Physician,
    medication: Medication
}

export interface PrescribedOperation{
  id?: number,
  physician: number,
  patient: number,
  medication: number,
  date: Date,
  appointment: number,
  dose: string
}

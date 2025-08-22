import { TrainedIn } from "./trainedin.interface"

export interface Physician{
  physicianId: number,
  name: string,
  position: string,
  createdOn: Date,
  appointments: [
    {
      appointmentId: number,
      starDateTime: Date,
      endDateTime: Date,
      patient: {
        patientId: number,
        name: string,
        address: string,
        phone: string,
        createdOn: Date
      }
    }
  ],
  trainedIn: TrainedIn

}

export interface PhysicianCreate{
  id?:number
  name: string;
  position: string
}

export interface PhysicianDelete{
  id?:number
  name: string
  position: string
}

export interface PhysicianUpdate{
  id?:number
  name: string
  position: string
}

import { Procedure } from "./procedure.interface";

export interface TrainedIn{
  trainedInId: number,
  physicianId: number,
  physcianName: string,
  certificationDate: Date,
  certificationExpires: Date,
  createdOn: Date,
  treatment: Procedure
}

export interface trainedInOperation{
  id?: number,
  physician: number,
  treatment?: number,
  certificationDate: Date,
  certificationExpires: Date
}

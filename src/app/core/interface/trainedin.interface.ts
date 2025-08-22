export interface TrainedIn{
  trainedInId: number,
  physicianId: number,
  physcianName: string,
  certificationDate: Date,
  certificationExpires: Date,
  createdOn: Date,
  treatment: {
    procedureId: number,
    name: string,
    cost: number,
    createdOn: Date
  }
}

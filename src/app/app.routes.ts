import { Routes } from '@angular/router';
import { PhysicianListComponent } from './components/physician/physician-list/physician-list.component';
import { NurseListComponent } from './components/nurse/nurse-list/nurse-list.component';
import { PatientsListComponent } from './components/patients/patients-list/patients-list.component';
import { BlockListComponent } from './components/block/block-list/block-list.component';
import { OnCallListComponent } from './components/onCall/on-call-list/on-call-list.component';
import { AppointmentListComponent } from './components/appointment/appointment-list/appointment-list.component';
import { RoomListComponent } from './components/room/room-list/room-list.component';
import { StayListComponent } from './components/stay/stay-list/stay-list.component';
import { ProcedureListComponent } from './components/procedure/procedure-list/procedure-list.component';
import { MedicationListComponent } from './components/medication/medication-list/medication-list.component';
import { PrescribedListComponent } from './components/prescribed/prescribed-list/prescribed-list.component';
import { TrainedInListComponent } from './components/trainedIn/trained-in-list/trained-in-list.component';

export const routes: Routes = [
  {path: 'physician', component: PhysicianListComponent},
  {path: 'nurse', component: NurseListComponent},
  {path: 'patients', component: PatientsListComponent},
  {path: 'block', component: BlockListComponent},
  {path: 'onCall',component: OnCallListComponent},
  {path: 'appointment',component: AppointmentListComponent},
  {path: 'room',component: RoomListComponent},
  {path: 'stay',component: StayListComponent},
  {path: 'procedure',component: ProcedureListComponent},
  {path: 'medication',component: MedicationListComponent},
  {path: 'prescribed',component: PrescribedListComponent},
  {path: 'trainedIn',component: TrainedInListComponent}
];

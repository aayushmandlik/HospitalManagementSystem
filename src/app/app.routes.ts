import { Routes } from '@angular/router';
import { PhysicianListComponent } from './components/physician/physician-list/physician-list.component';
import { NurseListComponent } from './components/nurse/nurse-list/nurse-list.component';

export const routes: Routes = [
  {path: 'physician', component: PhysicianListComponent},
  {path: 'nurse', component: NurseListComponent}
];

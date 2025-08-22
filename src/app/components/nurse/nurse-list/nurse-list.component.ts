import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../../core/services/nurse.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Nurse } from '../../../core/interface/nurse.interface';

@Component({
  selector: 'app-nurse-list',
  imports: [MatTableModule],
  templateUrl: './nurse-list.component.html',
  styleUrl: './nurse-list.component.css'
})
export class NurseListComponent implements OnInit{

  nurseList: Nurse[] = []
  dataSource = new MatTableDataSource<Nurse>()
   displayColumns = ['nurseId','name','position','registered','createdOn']
  constructor(private nurseService: NurseService){}
  ngOnInit(): void {
    this.loadNurse()
  }

  loadNurse(){
    this.nurseService.getNurseList().subscribe((data)=>{
      this.nurseList = data
      this.dataSource.data = data
      console.log(this.nurseList);

    })
  }
}

import { Component } from '@angular/core';
import { Block } from '../../../core/interface/block.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockService } from '../../../core/services/block.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-block-list',
  imports: [MatTableModule,MatToolbarModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './block-list.component.html',
  styleUrl: './block-list.component.css'
})
export class BlockListComponent {
  blockList: Block[] = []
  dataSource = new MatTableDataSource<Block>()
  displayColumns = ['blockId','blockFloor','blockCode','createdOn','actions']
  blockForm!: FormGroup
  currentBlock: Block = {
    blockId: 0,
    blockFloor: 0,
    blockCode: 0
  }
  isEdit = false
  searchTerm: string = ""

  constructor(private blockService: BlockService, private fb: FormBuilder){
    this.blockForm = this.fb.group({
      blockFloor: ['',Validators.required],
      blockCode: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadBlock()
  }

  loadBlock(){
    this.blockService.getBlockList().subscribe((data)=>{
      this.blockList = data
      this.dataSource.data = data
      console.log(this.blockList);

    })
  }

  addBlock(){
    const formData = this.blockForm.value
    if(this.isEdit){
      const updateBlock: Block = {...this.currentBlock,...formData}
      this.blockService.updateBlock(updateBlock).subscribe(()=>{
        this.loadBlock()
        this.blockForm.reset()
        this.isEdit=false
      })
    }
    else{
      const blockData: Block = {...formData}
      this.blockService.addBlock(blockData).subscribe(()=>{
        this.loadBlock()
        this.blockForm.reset()
      })
    }
  }

  editBlock(blockData: Block){
    this.currentBlock = {...blockData}
    this.blockForm.patchValue({
      blockFloor : blockData.blockFloor,
      blockCode: blockData.blockCode
    })
    this.isEdit=true
  }

  deleteBlock(blockData: Block){
    if(confirm(`Are you Sure, You want to delete ${blockData.blockCode}`)){
      this.blockService.deleteBlock(blockData).subscribe(()=>{
      this.loadBlock()
    })
    }
  }
}

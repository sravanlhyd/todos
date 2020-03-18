import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { UserService } from '../services/user.service';
import { Data } from '../models/data';


@Component({
  selector: 'app-dialogproduct',
  templateUrl: './dialogproduct.component.html',
  styleUrls: ['./dialogproduct.component.css']
})
export class DialogproductComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  todos:any;
  edit:boolean = false;
  products: Data[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
    })
  }

  get details(){
    return this.addForm.controls;
  }

  getTodos() {
    this.userService.getData().subscribe((res) => this.todos = res);
    console.log('data',this.todos);
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.addForm.value);

    this.userService.addData(this.addForm.value)
    .subscribe(res => {

    });

    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

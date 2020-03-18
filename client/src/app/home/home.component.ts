import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material';
import { DialogproductComponent } from '../dialogproduct/dialogproduct.component';
import { Data } from '../models/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;

  currentUser: User;
  users: User[] = [];
  todos: any = [];

  title: string;
  price: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.getTodos();
  }

  show = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogproductComponent, {
      width: '50%',
      data: {name: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  delete(data) {
    console.log(data)
    this.userService.deleteData(data).subscribe((res) => {
     console.log(res)
     this.getTodos();
    }, err => {
      console.log(err)
    });
  }


  getTodos() {
    this.userService.getData().subscribe((res) => this.todos = res);
    console.log('data',this.todos);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { User } from 'src/app/models/models';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource = new MatTableDataSource<User>();

  public users: User[] = [];

  constructor(
    private userSvc: UserService,
    private router: Router,
    private dialog: MatDialog,
    private dialogSvc: DialogService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userSvc.getUserList('user_id').subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
  }

  addUserDialog(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserList();
      }
    });
  }

  editUserDialog(user: any, index: any): void {
    this.dialogSvc.updatedUser = user;
    this.dialogSvc.isEditUser = true;
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '600px',
    });
  }

  deleteUser(user: any, index: any): void {
    console.log("Delete :: ", user, index)
  }

}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpsertComponent } from './components/modal-upsert.component';
import { User } from './model/user';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  users: User[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  /**
   * Get All User
   */
  ngOnInit(): void {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => (this.users = res));
  }

  /**
   * Delete user
   */
  deleteHandler(idToRemove: number): void {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/users/${idToRemove}`)
      .subscribe((res) => {
        this.users = this.users.filter((u) => u.id !== idToRemove);
      });
  }

  /**
   * Open Modal: Edit User
   */
  openModalEditUser(user: Partial<User>): void {
    // Open Modal Edit
    const dialogRef = this.dialog.open(ModalUpsertComponent, {
      data: user,
    });

    // Close Event Handler
    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.editUser({ ...user, ...updatedUser });
      }
    });
  }

  /**
   * Edit User
   */
  editUser(user: User): void {
    this.http
      .patch<User>(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        user
      )
      .subscribe((res) => {
        this.users = this.users.map((u) => {
          return u.id === user.id ? { ...u, ...user } : u;
        });
      });
  }

  /**
   * Open Modal: Add User
   */
  openModalAddUser(): void {
    // Open Modal Edit
    const dialogRef = this.dialog.open(ModalUpsertComponent, {
      data: null,
    });

    // Close Event Handler
    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        this.addUser(newUser);
      }
    });
  }

  /**
   * Add User
   */
  addUser(user: User): void {
    this.http
      .post<User>(`https://jsonplaceholder.typicode.com/users/`, user)
      .subscribe((res) => {
        this.users = [...this.users, res];
      });
  }
}

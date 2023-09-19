import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role.enum';
import { Category } from 'src/app/model/category';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  
 
  public isAdminOrSuperAdmin: boolean;
  public categorys: Category[];
  // userAuth:any;
  constructor(
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService
  ) {
    this.isAdminOrSuperAdmin = this.isAdmin || this.isSuperAdmin;
  }

  private get isAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ADMIN;
  }

  private get isSuperAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ROLE_SUPER_ADMIN;
  }


/*
  clients: Client[] = [];

  constructor(private clientService: ClientService) { }
  */

  ngOnInit() {
    this.getAllCategorys();
   // this.userAuth=localStorage.getItem("user");
  //  console.log(this.userAuth);
  }
  

  getAllCategorys(): void {
    this.categoryService.getAllCategorys().subscribe(
      categorys => {
        this.categorys = categorys;
        console.log('categorys retrieved successfully:', this.categorys);
      },
      error => {
        console.log('Failed to retrieve categorys:', error);
        // Handle error cases here
      }
    );
  }



  

  




  deleteCategory(category: Category): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id).subscribe(
          () => {
            console.log('category deleted successfully.');
            this.getAllCategorys();
            Swal.fire('Success', 'category deleted successfully.', 'success');
          },
          (error) => {
            console.log('Failed to delete category:', error);
            Swal.fire('Error', 'Failed to delete category.', 'error');
          }
        );
      }
    });
  }
  

}
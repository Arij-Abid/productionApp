import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { Category } from 'src/app/model/category';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

   
  category: Category = {
    id: 0,
    name:  '',
    description:  '',  

  };
  ngOnInit(): void {}





public isAdminOrSuperAdmin: boolean;

  constructor(private authenticationService: AuthenticationService,private categoryService: CategoryService, private router: Router) {
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

  
  addCategory(): void {
    this.categoryService.createCategory(this.category)
      .subscribe(
        () => {
          console.log('Category added successfully.');
          Swal.fire('Success!', 'Category created successfully.', 'success');
          this.router.navigate(['/category']);
        },
        error => {
          console.log('Failed to add Category:', error);
          // Handle error cases here
        }
      );
  }



}
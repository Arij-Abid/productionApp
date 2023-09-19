import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category: any = {}; // Initialize the 'category' object


  constructor(private authenticationService: AuthenticationService,  private route: ActivatedRoute,private categoryService: CategoryService, private router: Router) {
    this.isAdminOrSuperAdmin = this.isAdmin || this.isSuperAdmin;
  }


  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(Number(categoryId)).subscribe((category) => {
      this.category = category;
    });
  }

  

public isAdminOrSuperAdmin: boolean;


private get isAdmin(): boolean {
  const userRole = this.authenticationService.getUserRole();
  return userRole === Role.ADMIN;
}

private get isSuperAdmin(): boolean {
  const userRole = this.authenticationService.getUserRole();
  return userRole === Role.ROLE_SUPER_ADMIN;
}

updateCategory(): void {
  this.categoryService.updateCategory(this.category.id, this.category).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Category updated successfully.',
    }).then(() => {
      this.router.navigate(['/category']);
    });
  }, error => {
    console.log('Failed to update category:', error);
    // Handle error cases here
  });
}

}
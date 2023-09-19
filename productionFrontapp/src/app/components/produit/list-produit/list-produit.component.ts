import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role.enum';
import { Product } from 'src/app/model/product';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {


  public isAdminOrSuperAdmin: boolean;
  public products:Product[];

  constructor(
    private productService: ProductService,
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


  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
        console.log('products retrieved successfully:', this.products);
      },
      error => {
        console.log('Failed to retrieve products:', error);
        // Handle error cases here
      }
    );
  }



  

  deleteProduct(product: Product): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this Product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            console.log('Product deleted successfully.');
            this.getAllProducts();
            Swal.fire('Success', 'Product deleted successfully.', 'success');
          },
          (error) => {
            console.log('Failed to delete Product:', error);
            Swal.fire('Error', 'Failed to delete Product.', 'error');
          }
        );
      }
    });
  }

}
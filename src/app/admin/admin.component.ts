import { Component, OnInit } from '@angular/core';
import { ProductService} from "../services/product.service";
import { Product } from '../models/product';
import {Observable} from "rxjs";
import {ProductListComponent} from "../product-list/product-list.component";
import {AuthenticationService} from "../services/authentication.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  closeResult = '';
  products: Observable<Product[]>;


  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  qty: number;

  constructor(private productService: ProductService,
              public authService: AuthenticationService,
              private modalService: NgbModal,
              public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getProducts();

  }

  getProducts(category?: string): void {
    this.products = this.productService.getProducts(category);
  }

  onSubmit() {
    const product = new Product(
      '', // ID will be automatically generated by Firestore
      this.productName || '',
      (this.productName || '').toLowerCase(),
      this.description,
      this.price,
      this.imageUrl,
      this.category,
      this.qty=0
    );
    const productObj = Object.assign({}, product); // convert the Product instance to a plain JavaScript object
    this.productService.createProduct(productObj); // pass the plain JavaScript object to the createProduct method

    this.resetForm();
  }

  resetForm() {
    this.productName = '';
    this.description = '';
    this.price = 0;
    this.imageUrl = '';
    this.category = 'other';
    this.qty = 0;
  }


  onSubmit2(product: Product): void {
    this.updateProduct(product);
  }

  createProduct(product: Product){
    this.productService.createProduct(product).then(()=>{
      window.alert(product.name + ' product with id: ' + product.id + ' is created!')
    });
  }

  updateProduct(product: Product){
    this.productService.updateProduct(product).then(()=>{
      window.alert(product.name + ' product with id: ' + product.id + ' is updated!')
    });
  }



  deleteProduct(product: Product){
    this.productService.deleteProduct(product.id)
      .then(()=>{
        window.alert(product.name + ' product with id: ' + product.id + ' is deleted!')
      });
  }



  ///////////////////////////

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
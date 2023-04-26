import { Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {CartService} from "../services/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {NavComponent} from "../nav/nav.component";
import {FavoritesService} from "../services/favorites.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{
  closeResult = '';
  @Input() productItem: Product
  products: Observable<Product[]>;
  productFormGroup: FormGroup;

  constructor(
              public fs: FavoritesService,
              private nav: NavComponent,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private ps: ProductService,
              public authService: AuthenticationService,
              private cartService: CartService,
              public dialog: MatDialog)
  {
    this.productFormGroup = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      imageUrl: new FormControl(''),
      category: new FormControl(''),
      qty: new FormControl('')
    });

  }

  ngOnInit(){
    this.nav.filteredProducts.subscribe((products) => {
      this.products = products;
    });
    this.getProducts();
  }
  getProducts(category?: string): void {
    this.products = this.ps.getProducts(category);
  }


  filterByCategory(category: string): void {
    if (category) {
      this.products = this.ps.filterProductsByCategory(category);
    } else {
      this.products = this.ps.getProducts();
    }
  }
/*
  @Input() selectedCategory: string;
  @Output() categorySelected = new EventEmitter<string>();

  getProducts(category?: string): void {
    this.products = this.ps.getProducts(category);
  }
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.getProducts(category);
  }
*/
  deleteProduct(product: Product){
    this.ps.deleteProduct(product.id)
      .then(()=>{
        window.alert(product.name + ' product with id: ' + product.id + ' is deleted!')
      });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('A terméket a kosaradhoz adtuk!');
  }


///////////////////////////////////
  addToFavorites(product: Product){
    this.fs.addToFavorites(product);
    window.alert('KEDVENCEKHEZ ADVA! ❤');
  }

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

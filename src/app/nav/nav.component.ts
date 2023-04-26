import {Component, EventEmitter, Output, OnInit, Input, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import {FavoritesService} from "../services/favorites.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() filteredProducts = new EventEmitter<Observable<Product[]>>();
  closeResult = '';
  products: Observable<Product[]>;
  searchText: string;
  itemInCart:number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public favoritesService: FavoritesService,
    private ps: ProductService,
    private modalService: NgbModal,
    private cartService: CartService,
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,
    private router: Router
  ) {}


  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  ngOnInit() {
    this.getFilteredProducts();
    console.log("----ngOnInit----");



    this.cartService.numOfItems.subscribe((d) => {
      this.itemInCart = d.length;
    });
  }

  filterByText(): void {
    this.getFilteredProducts(undefined, undefined, undefined, this.searchText);
    console.log("FILTER BY TEXT!");
  }

  getFilteredProducts(category?: string, minimum?: number, maximum?: number, searchText?: string): void {
    let filteredProductsObservable: Observable<Product[]>;
    if (searchText) {
      filteredProductsObservable = this.ps.filterProductsByText(searchText);
      console.log("filteredProductsObservable!!!");
    } else if (category) {
      filteredProductsObservable = this.ps.filterProductsByCategory(category);
    } else if (minimum && maximum) {
      filteredProductsObservable = this.ps.filterProductsByPriceRange(minimum, maximum);
    } else {
      filteredProductsObservable = this.ps.getProducts();
    }
    this.filteredProducts.emit(filteredProductsObservable);
    console.log("EMIT!");
  }

  filterByCategory(category: string): void {
    this.getFilteredProducts(category);
  }

  filterByPriceRange(): void {
    const minimum = Number((<HTMLInputElement>document.getElementById("from")).value);
    const maximum = Number((<HTMLInputElement>document.getElementById("to")).value);
    if (minimum && maximum) {
      this.getFilteredProducts(undefined, minimum, maximum);
      console.log("IF PRICE!");
    }
    console.log("PRICE!");
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

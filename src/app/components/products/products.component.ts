import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loading: boolean = true;

  allProducts : any[] = [];
  products : any[] = [];
  categories: string[] = [];
  selectedPage = 0;

  selectedCategory: string = "";
  selectedPriceSort: string = "";
  selectedRatingSort: string = "";

  categorySubs: Subscription; 
  ratingSubs: Subscription; 
  priceSubs: Subscription; 

  constructor( private productsService: ProductsService ) { 
    this.categorySubs = this.productsService.onCategoryChange()
      .subscribe( category => {
        this.selectedCategory = category

        let prs = this.allProducts;

        let fprs = prs.filter( product => product.category === this.selectedCategory )

        this.products = this.paginate(fprs)
      })

    this.ratingSubs = this.productsService.onPriceSortChange()
      .subscribe( sort => {
        this.selectedPriceSort = sort 

        if( this.selectedPriceSort === 'asc' ) {
          this.products.forEach( page => {
            page.sort(( fe: any , se: any ) => {
                return fe.price - se.price
            })
          })
        }

        if( this.selectedPriceSort === 'desc' ) {
          this.products.forEach( page => {
            page.sort(( fe: any , se: any ) => {
                return se.price - fe.price
            })
          })
        }

      })

    this.priceSubs = this.productsService.onRatingSortChange()
      .subscribe( sort => { 
        this.selectedRatingSort = sort

        if( this.selectedRatingSort === 'asc' ) {
          this.products.forEach( page => {
            page.sort(( fe: any , se: any ) => {
                return fe.rating.rate - se.rating.rate
            })
          })
        }

        if( this.selectedRatingSort === 'desc' ) {
          this.products.forEach( page => {
            page.sort(( fe: any , se: any ) => {
                return se.rating.rate - fe.rating.rate
            })
          })
        }

      })
  }


  ngOnInit(): void {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(( json: any ) => {

        this.allProducts = json
        this.products = this.paginate(this.allProducts)
        this.categories = this.getCategories(this.allProducts)

        this.loading = false;
      })
  }

  setPage(page: number){
    this.selectedPage = page
  }

  setCategory( category: string ){
    this.selectedCategory = category;
  }

  setPriceSort( sort: string ){
    this.selectedPriceSort = sort;
  }

  setRatingSort( sort: string ){
    this.selectedRatingSort = sort;
  }

  paginate(productsList: any[]): any[] {
    let result: any[] = []
    let count = 0
    let A: any = []

    if( productsList.length > 5 ) {
      productsList.forEach(( product: any ) => {
        A.push(product);
        count++
  
        if( count == 5 ){
          result.push(A)
          count = 0
          A = []
        }
      })
    } else {
      result = [[...productsList]]
    }

    return result;
  }

  getCategories(productsList: any[]): any[] {
    let result: any [] = [];

    productsList.forEach( ( product: any ) => {
      if(!result.includes(product.category)){
        result.push(product.category)
      }
    }) 
    
    return result;
  }

}

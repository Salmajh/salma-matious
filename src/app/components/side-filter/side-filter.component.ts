import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent implements OnInit {

  @Input() categories: any[] = [];
  @Output() setCategoryEvent = new EventEmitter();
  @Output() setPriceSortEvent = new EventEmitter();
  @Output() setRatingSortEvent = new EventEmitter();

  showCategories = false;
  
  selectedCategory: string = "";
  selectedPriceSort: string = "";
  selectedRatingSort: string = "";

  categorySubs: Subscription; 
  ratingSubs: Subscription; 
  priceSubs: Subscription; 
  

  constructor( private productsService: ProductsService ) { 
    this.categorySubs = this.productsService.onCategoryChange()
      .subscribe( category => this.selectedCategory = category )

    this.ratingSubs = this.productsService.onPriceSortChange()
      .subscribe( sort => this.selectedPriceSort = sort )

    this.priceSubs = this.productsService.onRatingSortChange()
      .subscribe( sorti => this.selectedRatingSort = sorti )
  }

  ngOnInit(): void {}

  setCategory(category: string){
    this.productsService.setCategory(category)
  }

  setPriceSort(sort: string){
    this.productsService.setPriceSort(sort)
  }

  setRatingSort(sort: string){
    this.productsService.setRatingSort(sort)
  }

  toggleCategories(){
    this.showCategories = !this.showCategories
  }

}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private selectedCategory: string = "";
  private selectedPriceSort: string = "";
  private selectedRatingSort: string = "";

  private categorySubject = new Subject<any>();
  private priceSubject = new Subject<any>();
  private ratingSubject = new Subject<any>();

  constructor() { }

  setCategory( category: string ){
    this.selectedCategory = category;
    this.categorySubject.next(this.selectedCategory);
  }

  setPriceSort( sort: string ){
    this.selectedPriceSort = sort;
    this.priceSubject.next(this.selectedPriceSort);
  }

  setRatingSort( sort: string ){
    this.selectedRatingSort = sort;
    this.ratingSubject.next(this.selectedRatingSort);
  }

  onCategoryChange(){
    return this.categorySubject.asObservable();
  }

  onPriceSortChange(){
    return this.priceSubject.asObservable();
  }

  onRatingSortChange(){
    return this.ratingSubject.asObservable();
  }

}

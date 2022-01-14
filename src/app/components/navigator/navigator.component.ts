import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  pagesCount = 0;
  @Input() products : any = [];
  @Output() pageChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  setPage(page: number){
    this.pageChange.emit(page)
  }

}

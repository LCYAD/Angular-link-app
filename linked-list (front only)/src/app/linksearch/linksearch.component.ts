import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-linksearch',
  templateUrl: './linksearch.component.html',
  styleUrls: ['./linksearch.component.css']
})
export class LinksearchComponent implements OnInit {

  @Output() sendSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  SearchLink(ev){
    this.sendSearch.emit(ev.target.value);
  }
}

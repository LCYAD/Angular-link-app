import { Injectable, OnInit } from '@angular/core';
import { Link } from './links.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

@Injectable()
export class LinkService{

  links:Link[]; 

  fav_count: number;
  shared_count: number;
  searchStr: string;

  fav_count_subj: Subject<number>;
  shared_count_subj: Subject<number>;
  searchStr_subj: Subject<string>;
  links_subj: Subject<Link[]>;

  constructor(private http: HttpClient) { 
    this.fav_count_subj = new Subject<number>();
    this.shared_count_subj = new Subject<number>();
    this.links_subj = new Subject<Link[]>();
    this.searchStr_subj = new Subject<string>();
  }

  getLinksObs(): Observable<Link[]>{
    return this.links_subj.asObservable();
  }

  getLinks(): void{
    this.http.get('http://localhost:8000/api/links').subscribe(
      (links:Link[]) => {
        this.links_subj.next(links);
        this.getAllCount(links);
      },
      (err) => console.log(err)
    );
  }

  protected getAllCount(links:Link[]){
    this.shared_count_subj.next(this.getShareCount(links));
    this.fav_count_subj.next(links.length);
  }

  protected getShareCount(links:Link[]):number{
    return links.filter((link)=>{
      return link.shared === true;
    }).length;
  }

  addLink(title:string, url:string, tags:string[], shared:boolean):void{
    let id = UUID.UUID();
    let newlink = {id:id, title:title, url:url, tags:tags, shared:shared};
    this.http.post('http://localhost:8000/api/addlink', newlink).subscribe(
      (links:Link[]) => {
        this.links_subj.next(links);
        this.getAllCount(links);
      },
      (err) => console.log(err)
    );
  }

  removeLink(id:string){
    this.http.delete(`http://localhost:8000/api/removelink/${id}`).subscribe(
      (links:Link[]) => {
        this.links_subj.next(links);
        this.getAllCount(links);
      },
      (err) => console.log(err)
    );
  }

  toggleShare(ev:any){
    this.http.put(`http://localhost:8000/api/changeShare/${ev.target.value}`,"").subscribe(
      (links:Link[]) => {
        this.links_subj.next(links);
        this.getAllCount(links);
      },
      (err) => console.log(err)
    );
  }

  getFavObs():Observable<number>{
    //return the Subject of fav_count as Observable
    return this.fav_count_subj.asObservable();
  }

  getSharedObs():Observable<number>{
    //return the Subject of shared_count as Observable
    return this.shared_count_subj.asObservable();
  }

  getSearchStrObs():Observable<string>{
    //return the Subject of shared_count as Observable
    return this.searchStr_subj.asObservable();
  }

  changeSearch(searchStr:string){
    this.searchStr = searchStr;
    this.searchStr_subj.next(this.searchStr);
  }

  refreshSearch(){
    this.searchStr_subj.next(this.searchStr);
  }
}

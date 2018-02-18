import { Injectable, OnInit } from '@angular/core';
import { Link } from './links.model';
import { Tag } from './tags.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'


@Injectable()
export class LinkService{

  links:Link[]; 

  fav_count: number;
  shared_count: number;

  fav_count_subj: Subject<number>;
  shared_count_subj: Subject<number>;

  linksCollection: AngularFirestoreCollection<Link>;
  fblinks_obs: Observable<Link[]>

  constructor(private http: HttpClient, private afs: AngularFirestore) { 
    this.fav_count_subj = new Subject<number>();
    this.shared_count_subj = new Subject<number>();
    this.fblinks_obs = this.afs.collection('links').valueChanges() as Observable<Link[]>;
    this.fblinks_obs.subscribe(data=>{
      this.links = data;
      this.fav_count = this.links.length;
      this.shared_count = this.getShareCount();
      this.fav_count_subj.next(this.fav_count);
      this.shared_count_subj.next(this.shared_count);
    })
  }


  getLinks(){
    return this.fblinks_obs;
  }

  protected getShareCount():number{
    return this.links.filter((link)=>{
      return link.shared === true;
    }).length;
  }

  addLink(title:string, url:string, tags:Tag, shared:boolean):void{
    let id = this.afs.createId();
    let newlink = {id:id, title:title, url:url, tags:{tags:tags.tags}, shared:shared};
    this.afs.collection('links').doc(id).set(newlink);
    this.fav_increment();
    this.fav_count_subj.next(this.fav_count);
  }

  removeLink(id){
    for (let x:number = 0; x < this.links.length; x++){
      if (this.links[x].id === id){
        if (this.links[x].shared){
          this.shared_decrement();
          this.shared_count_subj.next(this.shared_count);
        }
        this.afs.doc(`links/${id}`).delete();
      }
    }
    this.fav_decrement();
    this.fav_count_subj.next(this.fav_count);
  }

  toggleShare(ev){
    //Change the shared status of the link in the array
    for (let x:number = 0; x < this.links.length; x++){
      if (this.links[x].id === ev.target.value){
        if (this.links[x].shared){
          this.shared_decrement();
        } else {
          this.shared_increment();
        }
        this.shared_count_subj.next(this.shared_count);
        this.links[x].shared = !this.links[x].shared;
        this.afs.doc<Link>(`links/${ev.target.value}`).update(this.links[x]);
      }
    }
  }

  getFavObs():Observable<number>{
    //return the Subject of fav_count as Observable
    return this.fav_count_subj.asObservable();
  }

  getSharedObs():Observable<number>{
    //return the Subject of shared_count as Observable
    return this.shared_count_subj.asObservable();
  }

  fav_increment():void{
    this.fav_count++;
  }

  fav_decrement():void{
    this.fav_count--;
  }

  shared_increment():void{
    this.shared_count++;
  }

  shared_decrement():void{
    this.shared_count--;
  }
  
}

import { Component, OnDestroy } from '@angular/core';
import { LinkService } from '../link.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {

  imagePath: string = "/assets/profile.gif";
  fav_count: number;
  shared_count: number;
  favsubscription: Subscription;
  sharedsubscription: Subscription;

  constructor(private linksService: LinkService) { 
    //Subscribe to the subject in linked Service and ask for the Fav. Count
    this.favsubscription = this.linksService.getFavObs().subscribe(
      (count) => this.fav_count = count,
      (error) => console.log(error)
    );
    //Subscribe to the subject in linked Service and ask for the Shared Count
    this.sharedsubscription = this.linksService.getSharedObs().subscribe(
      (count) => this.shared_count = count,
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.favsubscription.unsubscribe();
    this.sharedsubscription.unsubscribe();
  }

}

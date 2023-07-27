import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BBiw Spp';
  links:any = [
    {icon:'home',name:'หน้าแรก',path:'home'},
    {icon:'production_quantity_limits',name:'สินค้า',path:'product-list'},
    {icon:'person',name:'Profile',path:''},
    {icon:'settings',name:'ข้อมูลหลัก',path:''},
  ]
  url: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {}
  showInfo(link:any){

  }
}

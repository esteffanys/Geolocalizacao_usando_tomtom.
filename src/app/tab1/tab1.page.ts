import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page implements AfterViewInit {
  map!: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.map = tt.map({
      key: 'qWs3zqjNxKQGEexONPwFAxRE5knGm6K7',
      container: 'map',
      center: new tt.LngLat(-35, -5),
      zoom: 11,
    });
  }
}

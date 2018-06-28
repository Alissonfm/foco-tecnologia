import { Component, Input } from '@angular/core';

/**
 * Generated class for the LoaderItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loader-item',
  templateUrl: 'loader-item.html'
})
export class LoaderItemComponent {

  @Input() loading: boolean;
  
  constructor() {}

}

import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@sunbird/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { IInteractEventObject, IInteractEventEdata, IImpressionEventInput } from '@sunbird/telemetry';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  /**
   * reference of ResourceService
   */
  public resourceService: ResourceService;
  /**
   * used to store insatnce name
   */
  public instanceName;
  /**
   * used to store searched keyword
   */
  public searchKeyword;
  public showpopup = 'true';

  /**
  * To navigate to other pages
   */
  public router: Router;


  constructor(resourceService: ResourceService,
              router: Router,
              public activatedRoute: ActivatedRoute) {
    this.resourceService = resourceService;
    this.router = router;
  }

  ngOnInit() {
    this.instanceName = this.resourceService.instance;
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.router.url,
        subtype: this.activatedRoute.snapshot.data.telemetry.subtype
      }
    };

    if (this.getCookie('showpopup')) {
      this.showpopup = this.getCookie('showpopup');
    }
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
  }

  public navigateToSearch() {
    if (this.searchKeyword) {
      this.router.navigate(['/get/dial', this.searchKeyword]);
    }
  }

}

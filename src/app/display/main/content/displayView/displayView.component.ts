import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {PrismService} from '../../../../services/prism.service';
import {DisplayContentModel} from "../../../../models/display/DisplayContent.model";
import {DisplayService} from "../../../../services/display.service";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-display-view',
  templateUrl: 'displayView.component.html'
})

export class DisplayViewComponent implements OnInit, AfterViewInit {
  key: string;
  display: DocumentData;
  title: string;
  body: DisplayContentModel[];
  faEllipsisV = faEllipsisV;

  constructor(
    private displayService: DisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService) {}

  async ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    try {
      this.display = await this.displayService.getOneData(this.key);
      this.prismService.highlightAll();
    } catch (e) {
      console.log('ERREUR', e);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);
  }

  deleteDisplay(key) {
    this.displayService.deleteDisplay(key);
    this.router.navigate(['/display']).then();
  }
}

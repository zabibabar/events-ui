import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss']
})
export class GroupDetailsPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    console
  }
}

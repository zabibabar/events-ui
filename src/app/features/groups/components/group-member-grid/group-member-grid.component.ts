import { Component, Input, OnInit } from '@angular/core'
import { Member } from '../../interfaces/member'

@Component({
  selector: 'app-group-member-grid',
  templateUrl: './group-member-grid.component.html',
  styleUrls: ['./group-member-grid.component.scss']
})
export class GroupMemberGridComponent implements OnInit {
  @Input() groupMembers: Member[]
  @Input() max = 8

  visibleMembers: Member[]

  ngOnInit(): void {
    this.visibleMembers = this.groupMembers.slice(0, this.max)
  }
}

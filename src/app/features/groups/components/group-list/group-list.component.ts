import { Component } from '@angular/core'
import { Group } from '../../interfaces/group'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  groups: Group[] = [
    {
      id: '0',
      name: 'Fowler Fiesta'
    },
    {
      id: '1',
      name: 'Irish Run Club'
    },
    {
      id: '2',
      name: 'Big Storm Trivia'
    }
  ]

  groupTrackBy(_: number, group: Group) {
    return group.id
  }
}

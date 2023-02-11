import { Component, Input } from '@angular/core'
import { Group } from '../../interfaces/group'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group!: Group
}

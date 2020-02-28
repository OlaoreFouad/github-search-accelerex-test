import { User } from './../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  onUserItemClicked(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }

  ngOnInit() {
  }

}

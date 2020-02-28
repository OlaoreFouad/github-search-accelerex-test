import { UsersResponse } from './../../models/response.model';
import { User } from './../../models/user.model';
import { GithubService } from './../../services/github.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  loading = false;
  users: User[];
  totalCount: number;
  p = 1;

  private sub: Subscription;

  constructor(
    private githubService: GithubService,
    private title: Title
  ) { }

  ngOnInit() {

    this.sub = this.githubService.githubSearchTerm.subscribe(query => {
      this.loading = true;
      this.users = [];
      this.sub = this.githubService.getUsersByName(query).subscribe(
        (res: UsersResponse) => {
          this.users = res.items;
          console.dir(this.users);
          this.totalCount = res.total_count;
          this.loading = false;
          this.title.setTitle(`Search Results For ${ query }`);
        }
      );
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

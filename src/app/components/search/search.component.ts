import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormControl: FormControl;

  constructor(private githubService: GithubService) {
    this.searchFormControl = new FormControl('', Validators.required);
  }

  onSubmitQuery() {
    this.githubService.githubSearchTerm.next(this.searchFormControl.value);
  }

  ngOnInit() {
  }

}

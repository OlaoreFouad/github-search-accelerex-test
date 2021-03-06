import { GithubService } from './services/github.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './views/user-item/user-item.component';
import { LoaderComponent } from './views/loader/loader.component';
import { CustomPaginationControlsComponent } from './views/custom-pagination-controls/custom-pagination-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    UserListComponent,
    UserItemComponent,
    LoaderComponent,
    CustomPaginationControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }

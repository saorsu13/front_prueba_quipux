import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { PlaylistComponent } from './features/playlist/playlist.component';
import {AuthGuard} from "./auth.guard";
import {ListPlaylistComponent} from './features/list-playlist/list-playlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard]  },
  { path: 'list-playlist', component: ListPlaylistComponent, canActivate: [AuthGuard]  },
];

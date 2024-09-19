import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-list-playlist',
  standalone: true,
  imports: [],
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.css']
})
export class ListPlaylistComponent {

  constructor(private router: Router) { }

  goToCreatePlaylist() {
    this.router.navigate(['/playlist']);
  }
}

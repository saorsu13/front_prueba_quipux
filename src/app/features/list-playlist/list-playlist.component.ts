import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { JsonPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-playlist',
  standalone: true,
  templateUrl: './list-playlist.component.html',
  imports: [
    JsonPipe,
    CommonModule
  ],
  styleUrls: ['./list-playlist.component.css']
})
export class ListPlaylistComponent implements OnInit {

  playlists: any[] = [];
  filteredPlaylists: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.apiService.getAllPlaylists().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.playlists = data;
        this.filteredPlaylists = data;
      },
      (error) => {
        console.error('Error al cargar playlists:', error);
      }
    );
  }

  goToCreatePlaylist() {
    this.router.navigate(['/playlist']);
  }
}

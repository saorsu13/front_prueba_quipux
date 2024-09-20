import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-playlist',
  standalone: true,
  templateUrl: './list-playlist.component.html',
  imports: [
    JsonPipe,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./list-playlist.component.css']
})
export class ListPlaylistComponent implements OnInit {

  playlists: any[] = [];
  filteredPlaylists: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.apiService.getAllPlaylists().subscribe(
      (data: any) => {
        this.playlists = data;
        this.filteredPlaylists = data;
      },
      (error) => {
        console.error('Error al cargar playlists:', error);
      }
    );
  }

  searchPlaylist(): void {
    if (this.searchTerm.trim()) {
      this.apiService.getPlaylistByName(this.searchTerm).subscribe(
        (data: any) => {
          this.filteredPlaylists = [data];
        },
        (error) => {
          console.error('Error en la búsqueda de playlist:', error);
          this.filteredPlaylists = [];
        }
      );
    } else {
      this.filteredPlaylists = this.playlists;
    }
  }

  goToCreatePlaylist() {
    this.router.navigate(['/playlist']);
  }
}

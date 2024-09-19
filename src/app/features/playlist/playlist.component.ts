import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistForm!: FormGroup;
  genres: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      songs: this.fb.array([])
    });
    this.loadGenres();
  }

  get songs(): FormArray {
    return this.playlistForm.get('songs') as FormArray;
  }

  addSong() {
    console.log('Añadiendo una canción');
    const songForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: [''],
      year: [''],
      genre: ['', Validators.required]
    });

    this.songs.push(songForm);
  }


  removeSong(index: number) {
    this.songs.removeAt(index);
  }

  addPlaylist() {
    if (this.playlistForm.invalid) {
      this.playlistForm.markAllAsTouched();
      return;
    }

    //console.log('Playlist enviada:', this.playlistForm.value);

    this.apiService.addPlaylist(this.playlistForm.value).subscribe(
      response => {
        console.log('Playlist guardada con éxito:', response);
        alert('Playlist Agregada');
        this.playlistForm.reset();
        this.closeModal();
      },
      error => {
        console.error('Error al guardar la playlist:', error);
        alert('Hubo un error al agregar la playlist');
      }
    );
  }

  closeModal() {
    const modalElement = document.getElementById('modal-id');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
  loadGenres() {
    this.apiService.getGenres().subscribe(
      (data: string[]) => {
        this.genres = data;
        console.log('Géneros cargados:', this.genres);
      },
      error => {
        console.error('Error al cargar los géneros:', error);
      }
    );
  }
}



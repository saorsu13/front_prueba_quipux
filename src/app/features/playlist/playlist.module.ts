import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistComponent } from './playlist.component';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  exports: [PlaylistComponent]
})
export class PlaylistModule { }

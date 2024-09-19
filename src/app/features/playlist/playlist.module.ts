import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlaylistComponent } from './playlist.component';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [PlaylistComponent]
})
export class PlaylistModule { }

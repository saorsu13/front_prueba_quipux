import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

   getToken(): string | null {
    const token = localStorage.getItem('jwt');
    console.log(localStorage.getItem('jwt'));
    return token;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    const trimmedToken = token ? token.trim() : '';
    console.log('Enviando token con Bearer:', trimmedToken);

    return new HttpHeaders({
      'Authorization': `Bearer ${trimmedToken}`
    });
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, loginData, { responseType: 'text' })
      .pipe(
        map(token => {
          localStorage.setItem('jwt', token);
          return token;
        })
      );
  }

  addPlaylist(playlist: any): Observable<any> {
    console.log('Datos de la playlist que se enviarán:', playlist);
    return this.http.post(`${this.apiUrl}/lists/add`, playlist, {
      headers: this.getHeaders()
    });
  }

  getGenres(): Observable<string[]> {
    return this.http.get<{genres: string[]}>(`${this.apiUrl}/lists/genres`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => response.genres)
    );
  }

  getAllPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lists/getPlaylist`, {
      headers: this.getHeaders()
    }).pipe(
      map((data: any) => {
        console.log('Datos recibidos de la API:', data);
        return data;
      })
    );
  }

  getPlaylistByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lists/getBy/${name}`, {
      headers: this.getHeaders()
    });
  }


  deletePlaylist(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lists/${name}`, {
      headers: this.getHeaders()
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    console.log('Token eliminado, el usuario ha cerrado sesión');
  }
}

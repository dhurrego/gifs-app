import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../gifs-page/interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'X5umd4WtHGlA6A43ZPYINNBYv1q6MNbL';
  private url: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private _http: HttpClient ) { 

    this._historial = JSON.parse(localStorage.getItem('historyGifsApp')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultGifsApp')!) || [];


  }

  buscarGifs( query: string = ''){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      // Persistencia de datos con localStorage
      localStorage.setItem('historyGifsApp', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('limit', '10')
                        .set('q', query);

    this._http.get<SearchGifsResponse>(`${this.url}/search`, { params }).subscribe(
      response => {
        this.resultados = response.data;
        // Persistencia de datos con localStorage
        localStorage.setItem('resultGifsApp', JSON.stringify(this.resultados));
      },
      error => {
        console.log( <any>error );
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  get historial(): string[] {
    return this._gifsService.historial;
  }

  constructor( private _gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar( query: string ){
    this._gifsService.buscarGifs(query);
  }

  

}

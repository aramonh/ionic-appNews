import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categorias =  ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', ];
  categoriaAct = this.categorias[0];
  noticias: Article[] = [];
  constructor(private noticiasSvc: NoticiasService ) {}

  ngOnInit(){
   this.cargarNoticias(this.categoriaAct);
  }

  loadData(event){

    console.log(event);
    this.cargarNoticias(this.segment.value , event );
  }

  cambioCategoria( event ){
    console.log(event);
    this.noticias = [];
    this.infiniteScroll.disabled = false;
    this.cargarNoticias(event.detail.value);
  }


  cargarNoticias(categoria: string, event?){
    this.noticiasSvc.getTopHeadLinesCategoria(categoria).subscribe((res) => {
      console.log(categoria);
      console.log('Article Categoria:', res);

      if ( res.articles.length === 0 ){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      if ( event ){
        event.target.complete();
      }

      this.noticias.push(...res.articles );
    });

}
}

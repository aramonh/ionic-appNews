import { Injectable } from '@angular/core';

import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article [] = [];
  constructor( private storage: Storage,
               private toastController: ToastController ) {
    this.cargarFavoritos();
  }

    guardarNoticia( noticia: Article ){

      const existe = this.noticias.find( noti =>
        noti.title === noticia.title
      );
      if ( !existe ){
      this.noticias.unshift( noticia ); // Push encima una noticia
      this.storage.set('favoritos', this.noticias );  // Save todo el Arreglo de Noticias

      this.presentToast('Agregado a Favorito');
      }else{
      this.presentToast('Ya existe en Favorito');
      }


    }
    borrarNoticia(noticia: Article){
      this.noticias = this.noticias.filter( noti =>
        noti.title !== noticia.title);
      this.storage.set('favoritos', this.noticias );

      this.presentToast('Eliminado de Favorito');
      }

    async cargarFavoritos(){
      const favoritos = await this.storage.get('favoritos');
      console.log(favoritos);
      if (favoritos) {
        this.noticias = favoritos;
      }
    }
    async presentToast(message) {
      const toast = await this.toastController.create({
        message,
        duration: 1500
      });
      toast.present();
    }

}

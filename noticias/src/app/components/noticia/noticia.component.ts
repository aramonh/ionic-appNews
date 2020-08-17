import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() noticia: Article;
@Input() i: number;
@Input() enFavoritos ;
  constructor( private iab: InAppBrowser,
               private actionSheetController: ActionSheetController,
               private socialSharing: SocialSharing,
               private dtaLocalSrv: DataLocalService ) { }

  ngOnInit() {}
  abrirNoticia(){
    console.log('noticia', this.noticia.url );
    const browser = this.iab.create(this.noticia.url  , '_system');
  }

  async lanzarMenu(){
    let guardarBorrarBtn;

    if(this.enFavoritos){
      //borrar 
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dtaLocalSrv.borrarNoticia( this.noticia );
        }
      };
    }else{
      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dtaLocalSrv.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarBtn
      , {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}

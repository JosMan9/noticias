import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index: number;

  constructor(private app: InAppBrowser,
    private platform: Platform,
    private actionSheetCTRL: ActionSheetController,
    private sharing: SocialSharing,
    private storage: StorageService) { }

  ngOnInit() { }

  openArticle() {

    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.app.create(this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');
  }

  async onClick() {

    const articuloFavorito = this.storage.articleinFavoeite(this.article);

    const action = await this.actionSheetCTRL.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.shareArticle()
        },

        {
          text: articuloFavorito ? 'Remover Favorito' : 'Favorito',
          icon: articuloFavorito ? 'heart' : 'heart-outline',
          handler: () => this.toggleFavorito(),
          cssClass: articuloFavorito ? 'rojo' : ''
        },

        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'rojo'
        }


      ]
    });

    await action.present();
  }


  toggleFavorito() {
    this.storage.saveRemoveArticle(this.article);
  }
  shareArticle() {
    this.sharing.share(
      this.article.title, this.article.source.name, null, this.article.url
    );
  }

}

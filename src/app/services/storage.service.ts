import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _articulosLocales: Article[] = [];

  constructor(private storage: Storage) { this.init(); }

  get localArticles() {
    return [...this._articulosLocales];
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
  }

  async saveRemoveArticle(article: Article) {

    const existe = this._articulosLocales.find(localArticle => localArticle.title === article.title);

    if (existe) {
      this._articulosLocales = this._articulosLocales.filter(localArticle => localArticle.title !== article.title);
    } else {
      this._articulosLocales = [article, ...this._articulosLocales];

    }

    this._storage.set('articles', this._articulosLocales);

  }

  async loadFavorites() {

    try {

      const articles = await this._storage.get('articles');
      this._articulosLocales = articles || [];

    } catch (error) {

    }
  }

  articleinFavoeite(article: Article) {

    return !!this._articulosLocales.find(localArticle => localArticle.title === article.title);

  }
}

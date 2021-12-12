import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public categorias: string[] = ['business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'];

  public selected: string = this.categorias[0];
  public articles: Article[] = [];

  constructor(private data: NewsService) { }

  ngOnInit(): void {
    this.getArticle()
  }

  segmentChanged(event) {

    this.selected = event.detail.value;

    console.log(this.selected);

    this.getArticle(this.selected)
  }

  getArticle(category='business') {
    this.data.getTopHeadLinesByCategory(category).subscribe(articles => {
      this.articles = articles;
    });
  }

  loadData() {
    this.data.getTopHeadLinesByCategory( this.selected, true )
      .subscribe( articles => {
        
          if ( articles.length === this.articles.length ) {
            this.infiniteScroll.disabled = true;
            // event.target.disabled = true;
            return;
          }


          this.articles = articles;
          this.infiniteScroll.complete();
          // event.target.complete();    
         

        })

      }

}

import { GlobalFeedPage, MainPage, RegisterPage, SignInPage, YourFeedPage, EditArticlePage, ArticlePage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.globalFeed = new GlobalFeedPage(page);
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);

        this.login = new SignInPage(page);        
        this.yourFeed = new YourFeedPage(page);   
        this.article = new ArticlePage(page);     
        this.editArticle = new EditArticlePage(page); 
    }
}
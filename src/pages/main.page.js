export class MainPage{
    constructor(page){

        //техническое описание страницы
        //страничка - драйвер
       

this.signupLink = page.getByRole('link', { name: 'Sign up'});
this.loginLink = page.getByRole('link', { name: 'Login'});

this.firstTag = page.getByRole('link', { name: 'реклама'});           
this.beLike = page.getByRole('button', { name: '( 0 )' });
this.nextPage = page.getByRole('button', { name: 'Page 2' });
this.articlePreview = page.locator('.article-preview');



    }
// бизнесовые действия со страницей
    async gotoRegister()
    {
     await this.signupLink.click();
    }
        //методы

    async gotoTag(){
            await this.firstTag.click();
        }
            async getFirstArticle() {
        return this.articlePreview.first();
    }
    // async beLike(){
    //     await this.beLike.click();
    // }
        async beLike() {
        const article = await this.getFirstArticle();
        const likeButton = article.locator('button.btn-outline-primary');
        await likeButton.click();
        return likeButton.locator('.counter');
    }
    async nextPage(){
        await this.nextPage.click();
    }

        async gotoLogin()
    {
     await this.loginLink.click();
    }

}


export class ArticlePage{
    constructor(page){
    this.page = page;

// Локаторы для формы создания статьи
this.newArticleTitle =  page.getByRole('textbox', { name: 'Article Title' });
this.shortTextInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
this.descriptionInput = page.getByRole('textbox', { name: 'Write your article (in' });
this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
// Локаторы для комментариев
this.commentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
// Локаторы для управления статьей
this.deleteButton = page.getByRole('button', { name: 'Delete Article' })
                               .or(page.locator('.btn-outline-danger'))
                               .first();
// Локаторы для статей в ленте
this.firstArticle = page.locator('.article-preview').first();
this.articleTitle = page.locator('h1').first();
this.readMoreButton = page.locator('a').filter({ hasText: /read more|читать/i });
this.articleCards = page.locator('.article-preview');
// URL паттерн
this.url = /\/article/;
this.articleTitle = page.locator('h1');    
// Локаторы для страницы статьи
this.articleTitlePage = page.locator('[data-testid="article-title"]');
this.articleContent = page.locator('[data-testid="article-content"]');
this.articleMeta = page.locator('[data-testid="article-meta"]');   
// Локаторы из метода clickFirstArticle()
this.articleTitleInList = this.firstArticle.locator('h1'); // Заголовок статьи в списке
this.readMoreLink = this.readMoreButton;       
// Альтернативные локаторы
this.alternativeArticleCard = page.locator('.article-card, .news-item, .post-preview').first();
this.firstTag = page.locator('.tag-pill', { hasText: 'реклама' }).first();
// Навигация
this.createArticleButton = page.getByRole('link', { name: 'New Article' });
this.articleFirst = page.getByRole('heading');
// Для проверки описания статьи
this.articleDescription = page.locator('p').first();
// Для проверки тегов
this.testTag = page.getByText('test');
this.automationTag = page.getByText('automation');
// Для проверки URL
this.articleUrlPattern = /\/article/;

}



async actionNewArticle(newArticle1) {
        const { title, shortText, description, tags} = newArticle1;
            
            await this.newArticleTitle.click();
            await this.newArticleTitle.fill(title);
            await this.shortTextInput.click();
            await this.shortTextInput.fill(shortText);
            await this.descriptionInput.click(); 
            await this.descriptionInput.fill(description); 
            await this.tagsInput.click();
            await this.tagsInput.fill(tags);
            await this.publishArticleButton.click();
       
}
async createArticle () {
		await this.createArticleButton.click();
	}

async getFirstArticle() {
        await this.firstArticle.waitFor({ state: 'visible' });
        return {
            title: await this.firstArticle.locator('h1').textContent(),
            description: await this.firstArticle.locator('p').textContent(),
            element: this.firstArticle
        };
    }

async clickFirstArticle() {
       // console.log('URL перед кликом на статью:', await this.page.url());
        
        // Получим заголовок статьи для отладки
        const articleTitle = await this.articleTitleInList.textContent();
        console.log('Кликаем на статью:', articleTitle);
        
        await this.firstArticle.click();
        
        // Ждем загрузки 
        await this.page.waitForLoadState('networkidle');
        
        // console.log('URL после клика на статью:', await this.page.url());
        
        // // Если не перешли на страницу статьи, пробуем Read more
        if (!(await this.page.url()).includes('/article')) {
            console.log('Не перешли на страницу статьи, пробуем Read more...');
            
            if (await this.readMoreLink.isVisible()) {
                await this.readMoreLink.click();
                await this.page.waitForLoadState('networkidle');
            }
        }
    }

async transferProfile() {

		await this.navigationLogin.click();
        await this.profile.click();
	} 

async writeComment(commentText) {
        const {newCommentText} = commentText;
        await this.commentTextbox.click();
        await this.commentTextbox.fill(newCommentText);
        await this.postCommentButton.click();
    }

    // Методы для проверок
async verifyArticleCreated(expectedTitle) {

    await this.page.waitForURL(/\/article/);
    await this.articleTitle.waitFor({ state: 'visible' });
    
    const actualTitle = await this.articleTitle.textContent();
    if (!actualTitle.includes(expectedTitle)) {
        throw new Error(`Заголовок: "${actualTitle}" не содержит "${expectedTitle}"`);
    }
    
    console.log('Статья создана:', expectedTitle);
}


    async clickFirstTag() {
        await this.firstTag.click();
    }

    // async verifyFirstTagText(expectedText) {
    //     await expect(this.firstTag).toContainText(expectedText);
    // }

    async getFirstTagText() {
        return await this.firstTag.textContent();
    }

}
  
export class YourFeedPage {
	constructor(page) {

		this.page = page;
		this.homeButton = page.getByRole('link', { name: 'Home' });
		this.createArticleButton = page.getByRole('link', { name: 'New Article' });
		this.articleFirst = page.getByRole('heading');
		this.articleCommentText = page.getByRole('main');

        this.newArticleTitle =  page.getByRole('textbox', { name: 'Article Title' });
        this.shortTextInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Write your article (in' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
		//         // ДОБАВИТЬ ЛОКАТОРЫ ДЛЯ ПРОВЕРКИ ВСЕХ ПОЛЕЙ:
        // this.articleTitle = page.locator('h1').first();
        // this.articleDescription = page.locator('p').first(); // полное описание
        // this.articleShortText = page.locator('.article-preview p'); // краткое описание (адаптируйте селектор)
        // this.articleTags = page.locator('.tag-list'); // теги (адаптируйте селектор)

	}

	async createArticle () {
		await this.createArticleButton.click();
	}

	async goHome () {
		await this.homeButton.click();
	}
}
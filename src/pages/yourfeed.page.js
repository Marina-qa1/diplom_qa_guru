export class YourFeedPage {
	constructor(page) {

		this.page = page;
		this.homeButton = page.getByRole('link', { name: 'Home' });
		this.createArticleButton = page.getByRole('link', { name: 'New Article' });
		this.articleFirst = page.getByRole('heading');
		this.articleCommentText = page.getByRole('main');

	}

	async createArticle () {
		await this.createArticleButton.click();
	}

	async goHome () {
		await this.homeButton.click();
	}
}
import { test } from '@playwright/test';

export class EditArticlePage{
    constructor(page){
    this.page = page;

// Редактирование статьи
this.editNewArticle = page.getByRole('link', { name: 'Edit Article' }).first();
this.editArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
this.editArticleText = page.getByRole('textbox', { name: 'What\'s this article about?' });
this.editArticleDiscription = page.getByRole('textbox', { name: 'Write your article (in' });
this.editArticleTags = page.getByRole('textbox', { name: 'Enter tags' });
this.editPublishArticleButton = page.getByRole('button', { name: 'Update Article' });


this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
this.editArticleButton = page.getByRole('button', { name: 'Edit Article' }).first();
this.deleteCommentButton = page.locator('.btn.btn-sm.btn-outline-secondary.pull-xs-right');

this.firstArticle = page.locator('.article-preview').first();
this.deleteButton = page.getByRole('button', { name: 'Delete Article' })
                               .or(page.locator('.btn-outline-danger'))
                               .first();
}

 async gotoEdit() {

		await this.editNewArticle.click();
	}

 async editArticle (editArticleText) {
        const { title, annotation, content, tags} = editArticleText;

        await this.editArticleTitle.click();
        await this.editArticleTitle.fill(title);
        await this.editArticleText.click();
        await this.editArticleText.fill(annotation);
        await this.editArticleDiscription.click();
        await this.editArticleDiscription.fill(content);
        await this.editArticleTags.click();
        await this.editArticleTags.fill(tags);
        await this.editPublishArticleButton.click();

    }

 async deleteArticle() {
    // Обработчик диалога
    this.page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {}); // Игнорируем ошибки если диалог уже закрыт
    });
    
    await this.deleteButton.click();
    
    // Ждем либо диалог, либо завершение операции
    await Promise.race([
        this.page.waitForEvent('dialog'),
        this.page.waitForLoadState('networkidle')
    ]).catch(() => {}); 
}

}


  


import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {MainPage, RegisterPage, EditArticlePage, GlobalFeedPage, SignInPage, ArticlePage, YourFeedPage} from '../src/pages/index';


const URL = 'https://realworld.qa.guru/';


test.describe('Авторизация', () => {
  test.beforeEach(async ({ page }) => {
    const authUser = { 
    email: 'marina1@ya.ru', 
    password: 'qwerty' };
  const mainPage = new MainPage(page);
  const signInPage = new SignInPage(page);

  await page.goto(URL);
  await mainPage.gotoLogin();
  await signInPage.signIn(authUser);
  
});

        test('Пользователь может создать статью', async({page})=>
            {

        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);

        const newArticle1 = {
            title: `Тестовая статья ${Date.now()}`,
            shortText: 'Краткое описание статьи',
            description: 'Полное описание тестовой статьи',
            tags: 'test, automation'
        };

        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle1);

        await expect(yourFeedpage.articleFirst).toContainText(newArticle1.title);
});

   test('Пользователь может отредактировать уже созданную статью', async({page})=>
            {
    const newArticle = {
        title: faker.lorem.words(5),
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
        const editArticleText = {
        title: faker.lorem.words(5),
        annotation: faker.lorem.words(5),
        content: faker.lorem.text(),
        tags: faker.book.genre(),
        };       

        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);
        const editArticle = new EditArticlePage(page);

          // Создаем новую статью
        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle);
        

          // Редактируем созданную статью
        await editArticle.gotoEdit();
        await editArticle.editArticle(editArticleText);

        await expect(yourFeedpage.articleFirst).toContainText(editArticleText.title);

  });

  test('Пользователь может оставить комментарий', async ({page}) => {
        const newArticle = {
        title: faker.lorem.words(5),
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);
        const commentText = {newCommentText: faker.lorem.words(8)};

          // Создаем новую статью
        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle);

        // Пишем комментарий
        await articlePage.writeComment(commentText);

        await expect(yourFeedpage.articleCommentText).toContainText(commentText.newCommentText);

});

    test('Пользователь может удалить статью', async ({page}) => {

        const newArticle = {
        title: `Тест удаления ${Date.now()}`, // Уникальный заголовок
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
  const yourFeedPage = new YourFeedPage(page);
  const articlePage = new ArticlePage(page);
  const globalfeedPage = new GlobalFeedPage(page);
  const editArticle = new EditArticlePage(page);
  
    // Создаем новую статью
    await yourFeedPage.createArticle();
    await articlePage.actionNewArticle(newArticle);

   // Проверяем что мы на странице статьи (используем методы page object)
    await articlePage.verifyArticleCreated(newArticle.title);

   // Переходим в профиль чтобы увидеть статью
    await globalfeedPage.transferProfile();

   // Открываем статью
    await articlePage.clickFirstArticle();

    await editArticle.deleteArticle();

    await expect(yourFeedPage.articleCommentText).toContainText('Your Feed');

});

test('Пользователь может открыть первый тег Реклама', async ({ page }) => {
    const articlePage = new ArticlePage(page);
    
    await articlePage.clickFirstTag();
    await expect(articlePage.firstTag).toContainText('реклама');
    
});

    });
	

    

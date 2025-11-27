import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { App } from '../src/pages/app.page';
import 'dotenv/config'; // Добавляем загрузку environment variables

const URL = 'https://realworld.qa.guru/';


test.describe('Авторизация', () => {
let app;
  
  test.beforeEach(async ({ page }) => {

    app = new App(page);

    const authUser = { 
      email: process.env.TEST_USER_EMAIL, 
      password: process.env.TEST_USER_PASSWORD 
    };

    await page.goto(URL);
    await app.main.gotoLogin();
    await app.login.signIn(authUser);

  });

test('Пользователь может создать статью', async({page}) => {

    const newArticle1 = {
        title: `Тестовая статья ${Date.now()}`,
        shortText: 'Краткое описание статьи',
        description: 'Полное описание тестовой статьи',
        tags: 'test, automation'
    };

    await app.article.createArticle();
    await app.article.actionNewArticle(newArticle1);

    await expect(app.article.articleTitle).toContainText(newArticle1.title);   // 1. Заголовок статьи
    await expect(app.article.articleDescription).toContainText(newArticle1.description); // 2. Описание статьи
    await expect(app.article.testTag).toBeVisible(); // 3. Теги статьи
    await expect(app.article.automationTag).toBeVisible();
    await expect(page).toHaveURL(app.article.articleUrlPattern); // 4. Проверяем что мы на правильной странице
    await expect(app.article.deleteButton).toBeVisible(); // 5. Проверяем наличие кнопок управления статьей
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

          // Создаем новую статью
        await app.yourFeed.createArticle();
        await app.article.actionNewArticle(newArticle);

          // Редактируем созданную статью
        await app.editArticle.gotoEdit();
        await app.editArticle.editArticle(editArticleText);

        await expect(app.yourFeed.articleFirst).toContainText(editArticleText.title);

  });

  test('Пользователь может оставить комментарий', async ({page}) => {

        const newArticle = {
        title: faker.lorem.words(5),
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
        const commentText = {newCommentText: faker.lorem.words(8)};

          // Создаем новую статью
        await app.yourFeed.createArticle();
        await app.article.actionNewArticle(newArticle);

        // Пишем комментарий
        await app.article.writeComment(commentText);

        await expect(app.yourFeed.articleCommentText).toContainText(commentText.newCommentText);

});

    test('Пользователь может удалить статью', async ({page}) => {

        const newArticle = {
        title: `Тест удаления ${Date.now()}`, // Уникальный заголовок
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
  
    // Создаем новую статью
    await app.yourFeed.createArticle();
    await app.article.actionNewArticle(newArticle);

   // Проверяем что мы на странице статьи (используем методы page object)
    await app.article.verifyArticleCreated(newArticle.title);

   // Переходим в профиль чтобы увидеть статью
    await app.globalFeed.transferProfile();

   // Открываем статью
    await app.article.clickFirstArticle();
    await app.editArticle.deleteArticle();

    await expect(app.yourFeed.articleCommentText).toContainText('Your Feed');

});

test('Пользователь может открыть первый тег Реклама', async ({ page }) => {
    
    await app.article.clickFirstTag();
    await expect(app.article.firstTag).toContainText('реклама');
    
});

    });
	

    
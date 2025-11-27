import {test as base} from '@playwright/test';
import {App} from '../../pages/app.page';
import { Api } from "../../services/api.service";
import { UserBuilder } from '../builders';


const testUsers = {
  standardUser: {
    email: process.env.TEST_USER_EMAIL || 'marina1@ya.ru',
    password: process.env.TEST_USER_PASSWORD || 'qwerty'
  }
};

export const test = base.extend({
  app: async ({ page }, use) => {
    let application = new App(page);
    await use(application);
  },

  api: async ({ request }, use, testInfo) => {
    let api = new Api(request);
    
    // Автоматически получаем токен при создании api фикстуры
    const challengerResponse = await api.challenger.post(testInfo);
    const token = challengerResponse.headers()["x-challenger"];
    api.setToken(token);
    
    await use(api);
  },



  registerUser: async ({ page }, use) => {
    let app = new App(page);
    const user = new UserBuilder()
      .addEmail()
      .addName()
      .addPassword()
      .generate();
    //	console.log(app);
    await app.main.open();
    await app.main.gotoRegister();
    await app.register.register(user);
    await use(app);
  },
 
 
});
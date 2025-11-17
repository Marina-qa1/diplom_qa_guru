#  Дипломный проект по автоматизированному тестированию JS + Playwright

Работа выполнена в рамках курса JS + Playwright от школы QA.GURU

## Содержание
- [Описание](#описание)
- [Технологический стек](#технологический-стек)
- [Запуск тестов](#запуск-тестов)
- [Отчетность](#отчетность)
- [Уведомления](#уведомления)

## Описание
Дипломный проект, выполненный в рамках курса по автоматизации тестирования на JavaScript + Playwright. Проект включает UI и API тесты с интеграцией в CI/CD pipeline.

**Объекты тестирования:**
- **realworld.qa.guru** - веб-приложение для практики UI тестирования
- **apichallenges.eviltester.com** - RESTful API для отработки навыков API тестирования

## Технологический стек
Данный проект был написан на языке программирования JavaScript с использованием фреймворка Playwright. Для хранения исходного кода и запуска рабочих процессов используется облачная платформа GitHub с GitHub Actions.

Генерация отчетов о пройденных тестах формируется в Allure с отправкой отчетности в тест-менеджмент TestOps для анализа результатов и управления дефектами.

Уведомлений о статусе выполнения тестов отправляются в чат Telegram посредством бота.

![JavaScript](https://img.shields.io/badge/-JavaScript-%23F7DF1E?logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/-Playwright-%2345ba4b?logo=playwright&logoColor=white)
![Faker](https://img.shields.io/badge/-Faker-%2300AFF0?logo=faker&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-%23181717?logo=github)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-%232088FF?logo=github-actions&logoColor=white)
![Allure](https://img.shields.io/badge/-Allure-%23FF6A00?logo=allure&logoColor=white)
![Allure TestOps](https://img.shields.io/badge/-Allure_TestOps-%2316A085?logo=allure&logoColor=white)
![Telegram](https://img.shields.io/badge/-Telegram-%2326A5E4?logo=telegram&logoColor=white)

## Запуск тестов

### Локальный запуск
```bash

# Установка зависимостей
npm install

# Установка браузеров
npx playwright install --with-deps

# Запуск тестов
npm run test

# Генерация отчета
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```
### Запуск в CI/CD
Push в main/master ветки

Pull Request в main/master

Ручной запуск через GitHub Actions

## Отчетность

### 📊 Allure Report
[Ссылка на отчёт](https://jenkins.autotests.cloud/view/004/job/004-Marina-js/allure/)

<p text-align="center">
<img title="Allure Report" src="media/allure.jpg" alt="Пример отображения" />
</p>

**Включает:**

Детальную статистику тестов

Историю запусков 

Скриншоты и видео падающих тестов

Логи выполнения

### 🔧 Allure TestOps
<p text-align="center">
<img title="Allure TestOps" src="media/testOps.jpg" alt="Пример отображения" />
</p>

<p text-align="center">
<img title="Allure TestOps" src="media/testOpsRes.jpg" alt="Пример отображения" />
</p>


## Уведомления

### 📱 Telegram
После каждого запуска тестов приходит уведомление с результатами 
<p text-align="center">
<img title="Telegram Notifications" src="media/telegram.jpg" alt="Пример отображения" />
</p>

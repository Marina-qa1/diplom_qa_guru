import { expect } from "@playwright/test";
import { test } from "../src/helpers/fixtures/fixture";

test.describe("Challenge", () => {
  test("02 GET получить токен", { tag: '@API' }, async ({ api }, testInfo) => {
    const body = await api.challenges.get(api.getToken(), testInfo);
    expect(body.challenges.length).toBe(59);
  });

  test("03 GET /todos - вернуть список задач", { tag: '@API' }, async ({ api }, testInfo) => {
    const response = await api.todos.getAll(api.getToken(), testInfo);
    
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    
    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0); 

    if (body.todos.length > 0) {
      expect(body.todos[0]).toHaveProperty("id");
      expect(body.todos[0]).toHaveProperty("title");
      expect(body.todos[0]).toHaveProperty("doneStatus");
      expect(body.todos[0]).toHaveProperty("description");
    }
  });

  test("04 GET /todo (404) not plural", { tag: '@API' }, async ({ api }, testInfo) => {
    const response = await api.todos.getTodoNotPlural(api.getToken(), testInfo);
    
    expect(response.status()).toBe(404);
    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("05 GET /todos/{id} (200)", { tag: '@API' }, async ({ api }, testInfo) => {
    // Сначала создаем todo для теста
    const testTodo = {
      title: `Test Todo for GET ${Date.now()}`,
      doneStatus: false,
      description: "Test description for GET"
    };
    
    const createResponse = await api.todos.create(testTodo, api.getToken(), testInfo);
    expect(createResponse.status()).toBe(201);
    const createdTodo = await createResponse.json();
    const todoId = createdTodo.id;

    // Получаем конкретный todo по ID через сервис
    const singleResponse = await api.todos.getById(todoId, api.getToken(), testInfo);
    expect(singleResponse.status()).toBe(200);
    expect(singleResponse.headers()["content-type"]).toContain("application/json");
    
    const todoData = await singleResponse.json();
    expect(todoData.todos[0].id).toBe(todoId);
    expect(todoData.todos).toHaveLength(1);
    expect(todoData.todos[0].title).toBe(testTodo.title);

    // Очистка
    await api.todos.delete(todoId, api.getToken(), testInfo);
  });

  test("06 GET /todos/{id} (404)", { tag: '@API' }, async ({ api }, testInfo) => {
    const response = await api.todos.getById(99999, api.getToken(), testInfo);
    
    expect(response.status()).toBe(404);
    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("07 GET /todos (200) ?filter", { tag: '@API' }, async ({ api }, testInfo) => {
    const response = await api.todos.getWithFilter("true", api.getToken(), testInfo);
    
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    
    const filterData = await response.json();
    expect(filterData).toHaveProperty('todos');
    expect(Array.isArray(filterData.todos)).toBe(true);
  });

  test("08 HEAD /todos (200)", { tag: '@API' }, async ({ api }, testInfo) => {
    const headResponse = await api.todos.head(api.getToken(), testInfo);
    
    expect(headResponse.status()).toBe(200);
    
    const headers = headResponse.headers();
    expect(headers["x-challenger"]).toBe(api.getToken());
  });

  test("09 POST /todos (201)", { tag: '@API' }, async ({ api }, testInfo) => {
    const newTodo = {
      title: `Test Todo ${Date.now()}`,
      doneStatus: true,
      description: "API testing with generated data"
    };
    
    const response = await api.todos.create(newTodo, api.getToken(), testInfo);
    expect(response.status()).toBe(201);
    
    const createdTodo = await response.json();
    expect(createdTodo.id).toBeGreaterThan(0);
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.doneStatus).toBe(newTodo.doneStatus);
    expect(createdTodo.description).toBe(newTodo.description);

    // Очистка
    await api.todos.delete(createdTodo.id, api.getToken(), testInfo);
  });

  test("19 PUT /todos/{id} full (200)", { tag: '@API' }, async ({ api }, testInfo) => {
    // Создаем todo для теста обновления
    const testTodo = {
      title: `Test Todo for Update ${Date.now()}`,
      doneStatus: false,
      description: "Test description for update"
    };
    
    const createResponse = await api.todos.create(testTodo, api.getToken(), testInfo);
    expect(createResponse.status()).toBe(201);
    const createdTodo = await createResponse.json();
    const todoId = createdTodo.id;

    // Данные для обновления
    const updateData = {
      title: `Updated Title ${Date.now()}`,
      doneStatus: true,
      description: `Updated Description ${Date.now()}`
    };

    const putResponse = await api.todos.update(todoId, updateData, api.getToken(), testInfo);
    expect(putResponse.status()).toBe(200);
    expect(putResponse.headers()["content-type"]).toContain("application/json");
    
    const updatedTodo = await putResponse.json();
    expect(updatedTodo.id).toBe(todoId);
    expect(updatedTodo.title).toBe(updateData.title);
    expect(updatedTodo.description).toBe(updateData.description);
    expect(updatedTodo.doneStatus).toBe(updateData.doneStatus);

    // Очистка
    await api.todos.delete(todoId, api.getToken(), testInfo);
  });

  test("23 DELETE /todos/{id} (200)", { tag: '@API' }, async ({ api }, testInfo) => {
    // Создаем todo для теста удаления
    const testTodo = {
      title: `Test Todo for Delete ${Date.now()}`,
      doneStatus: false,
      description: "Test description for delete"
    };
    
    const createResponse = await api.todos.create(testTodo, api.getToken(), testInfo);
    expect(createResponse.status()).toBe(201);
    const createdTodo = await createResponse.json();
    const todoId = createdTodo.id;

    // Удаляем
    const deleteResponse = await api.todos.delete(todoId, api.getToken(), testInfo);
    expect(deleteResponse.status()).toBe(200);

    // Проверяем, что todo удален
    const getResponse = await api.todos.getById(todoId, api.getToken(), testInfo);
    expect(getResponse.status()).toBe(404);
  });

  test("58 DELETE /todos/{id} (200) all", { tag: '@API' }, async ({ api }, testInfo) => {
    // Создаем несколько todos для теста
    const todo1 = {
      title: `Test Todo 1 ${Date.now()}`,
      doneStatus: false,
      description: "Test description 1"
    };
    
    const todo2 = {
      title: `Test Todo 2 ${Date.now()}`,
      doneStatus: true,
      description: "Test description 2"
    };

    const createResponse1 = await api.todos.create(todo1, api.getToken(), testInfo);
    const createResponse2 = await api.todos.create(todo2, api.getToken(), testInfo);
    const createdTodo1 = await createResponse1.json();
    const createdTodo2 = await createResponse2.json();

    // Удаляем созданные todos
    await api.todos.delete(createdTodo1.id, api.getToken(), testInfo);
    await api.todos.delete(createdTodo2.id, api.getToken(), testInfo);

    // Проверяем, что todos удалены
    const getResponse1 = await api.todos.getById(createdTodo1.id, api.getToken(), testInfo);
    const getResponse2 = await api.todos.getById(createdTodo2.id, api.getToken(), testInfo);
    
    expect(getResponse1.status()).toBe(404);
    expect(getResponse2.status()).toBe(404);
  });
});
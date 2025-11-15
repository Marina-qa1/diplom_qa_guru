import { expect } from "@playwright/test";
import { test } from "../src/helpers/fixtures/fixture";



test.describe("Challenge", () => {
  test("02 GET получить токен", { tag: '@API' }, async ({ api }, testInfo) => {
    
    const body = await api.challenges.get(api.getToken(), testInfo);
    expect(body.challenges.length).toBe(59);
  });

  test("03 GET /todos - вернуть список задач", { tag: '@API' }, async ({ api }, testInfo) => {
    
    const response = await api.todos.getAll(api.getToken(), testInfo);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    expect(body.todos.length).toBeGreaterThan(0); 

    if (body.todos.length > 0) {
      expect(body.todos[0]).toHaveProperty("id");
      expect(body.todos[0]).toHaveProperty("title");
      expect(body.todos[0]).toHaveProperty("doneStatus");
    }
  });

 test("08 HEAD /todos (200)", { tag: '@API' }, async ({ api }, testInfo) => {
  // GET запрос через сервис todos
  const getResponse = await api.todos.getAll(api.getToken(), testInfo);
  const getHeaders = getResponse.headers();

  // HEAD запрос через сервис todos (если есть метод head) или через api.request
  const headResponse = await api.request.head(`${testInfo.project.use.apiURL}/todos`, {
    headers: { 
      "X-CHALLENGER": api.getToken() 
    }
  }); 
  const headHeaders = headResponse.headers();
  
  expect(headResponse.status()).toBe(200);
  
  // Сравнение с GET ответом
  expect(headHeaders["content-type"]).toBe(getHeaders["content-type"]);
  expect(headHeaders["x-challenger"]).toBe(getHeaders["x-challenger"]);
  
  // Проверка наличия X-CHALLENGER заголовка
  expect(headHeaders["x-challenger"]).toBe(api.getToken());
});


test("09 POST /todos (201)", { tag: '@API' }, async ({ api }, testInfo) => {
  const newTodo = {
    title: "Create first POST",
    doneStatus: true,
    description: "API testing"
  };
  
  // POST запрос через сервис todos (если есть метод create) или через api.request
  const response = await api.request.post(`${testInfo.project.use.apiURL}/todos`, {
    headers: { 
      "X-CHALLENGER": api.getToken(),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(newTodo)
  }); 
  
  const createdTodo = await response.json();

  expect(response.status()).toBe(201);
  expect(createdTodo.id).toBeGreaterThan(0);
  expect(createdTodo.title).toBe(newTodo.title);
  expect(createdTodo.doneStatus).toBe(newTodo.doneStatus);
  expect(createdTodo.description).toBe(newTodo.description);
});


test("19 PUT /todos/{id} full (200)", { tag: '@API' }, async ({ api }, testInfo) => {
  // GET запрос через сервис todos для получения существующей задачи
  const getResponse = await api.todos.getAll(api.getToken(), testInfo);
  const body = await getResponse.json();
  const firstTodoId = body.todos[0].id;

  // Создаем полную полезную нагрузку для обновления (без id)
  const updateData = {
    title: `Updated Title ${Date.now()}`,
    doneStatus: true,
    description: `Updated Description ${Date.now()}`
  };

  // Выполняем PUT запрос через api.request
  const putResponse = await api.request.put(`${testInfo.project.use.apiURL}/todos/${firstTodoId}`, {
    headers: { 
      "X-CHALLENGER": api.getToken(),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(updateData)
  }); 

  const updatedTodo = await putResponse.json();

  expect(putResponse.status()).toBe(200);
  expect(putResponse.headers()["content-type"]).toContain("application/json");
  expect(updatedTodo.id).toBe(firstTodoId);
  expect(updatedTodo.title).toBe(updateData.title);
  expect(updatedTodo.description).toBe(updateData.description);
  expect(updatedTodo.doneStatus).toBe(updateData.doneStatus);
});


test("23 DELETE /todos/{id} (200)", { tag: '@API' }, async ({ api }, testInfo) => {
  // GET запрос через сервис todos для получения существующей задачи
  const getResponse = await api.todos.getAll(api.getToken(), testInfo);
  const body = await getResponse.json();
  const todoToDelete = body.todos[0];
  const todoId = todoToDelete.id;

  // Выполняем DELETE запрос через api.request
  const deleteResponse = await api.request.delete(`${testInfo.project.use.apiURL}/todos/${todoId}`, {
    headers: { 
      "X-CHALLENGER": api.getToken()
    }
  });

  const responseBody = await deleteResponse.text();

  expect(deleteResponse.status()).toBe(200);
  expect(responseBody).toBe("");
});


  test("58 DELETE /todos/{id} (200) all", { tag: '@API' }, async ({ api }, testInfo) => {
    const getResponse = await api.todos.getAll(api.getToken(), testInfo);
    const body = await getResponse.json();
    const todos = body.todos;

    while (todos.length > 0) {
      const lastTodo = todos[todos.length - 1];
      
      const deleteResponse = await api.request.delete(`${testInfo.project.use.apiURL}/todos/${lastTodo.id}`, {
        headers: { 
          "X-CHALLENGER": api.getToken()
        }
      });
      
      expect(deleteResponse.status()).toBe(200);
      
      const updatedResponse = await api.todos.getAll(api.getToken(), testInfo);
      const updatedBody = await updatedResponse.json();
      todos.length = 0;
      todos.push(...updatedBody.todos);
      
      console.log(`Tasks remaining: ${todos.length}`);
    }
    
    const finalResponse = await api.todos.getAll(api.getToken(), testInfo);
    const finalBody = await finalResponse.json();
    expect(finalBody.todos.length).toBe(0);
    console.log('✓ SUCCESS: No tasks remain in the system - all tasks have been deleted');
  });


    }); 



 
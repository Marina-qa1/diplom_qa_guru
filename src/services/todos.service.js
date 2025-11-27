import { test } from "@playwright/test";

export class TodosService {
  constructor(request) {
    this.request = request;
  }

  async getAll(token, testInfo) {
    return test.step("GET /todos - получить все задачи", async () => {
      const response = await this.request.get(`${testInfo.project.use.apiURL}/todos`, {
        headers: { 
          "X-CHALLENGER": token,
          "Accept": "application/json"
        }
      });
      return response;
    });
  }

  async getTodoNotPlural(token, testInfo) {
    return test.step("GET /todo (404) - неправильный URL", async () => {
      const response = await this.request.get(`${testInfo.project.use.apiURL}/todo`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        }
      });
      return response;
    });
  }

  async getById(id, token, testInfo) {
    return test.step(`GET /todos/${id} - получить задачу по ID`, async () => {
      const response = await this.request.get(`${testInfo.project.use.apiURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token,
          "Accept": "application/json"
        }
      });
      return response;
    });
  }

  async getWithFilter(doneStatus, token, testInfo) {
    return test.step(`GET /todos?doneStatus=${doneStatus} - фильтр задач`, async () => {
      const response = await this.request.get(`${testInfo.project.use.apiURL}/todos?doneStatus=${doneStatus}`, {
        headers: { 
          "X-CHALLENGER": token,
          "Accept": "application/json"
        }
      });
      return response;
    });
  }

  async head(token, testInfo) {
    return test.step("HEAD /todos - заголовки", async () => {
      const response = await this.request.head(`${testInfo.project.use.apiURL}/todos`, {
        headers: { 
          "X-CHALLENGER": token
        }
      });
      return response;
    });
  }

  async create(todoData, token, testInfo) {
    return test.step("POST /todos - создать задачу", async () => {
      const response = await this.request.post(`${testInfo.project.use.apiURL}/todos`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        },
        data: JSON.stringify(todoData)
      });
      return response;
    });
  }

  async update(id, updateData, token, testInfo) {
    return test.step(`PUT /todos/${id} - обновить задачу`, async () => {
      const response = await this.request.put(`${testInfo.project.use.apiURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        },
        data: JSON.stringify(updateData)
      });
      return response;
    });
  }

  async delete(id, token, testInfo) {
    return test.step(`DELETE /todos/${id} - удалить задачу`, async () => {
      const response = await this.request.delete(`${testInfo.project.use.apiURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token
        }
      });
      return response;
    });
  }
}
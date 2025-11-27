import { test } from "@playwright/test";

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }

  async get(token, testInfo) {
    return test.step("GET /challenges", async () => {
      const response = await this.request.get(
        `${testInfo.project.use.apiURL}/challenges`,
        {
          headers: { "X-CHALLENGER": token },
        },
      );
      return response.json();
    });
  }
}
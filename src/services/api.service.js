import { ChallengerService } from './challenger.service.js';
import { ChallengesService } from './challenges.service.js';
import { TodosService } from './todos.service.js';

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.challenges = new ChallengesService(request);
    this.todos = new TodosService(request);
    this.token = null; 
  }
  
  setToken(token) {
    this.token = token;
  }
  
  getToken() {
    return this.token;
  }
}
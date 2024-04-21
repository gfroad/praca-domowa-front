import {  Injectable } from '@angular/core';
import axios from 'axios';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private jwtService: JwtService) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.jwtService.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.jwtService.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }
}
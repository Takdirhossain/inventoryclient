import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(data: any) {
    if (data.email == 'gg@gmail.com' && data.password == '123456') {
      return data;
    }
    return false;
  }
}

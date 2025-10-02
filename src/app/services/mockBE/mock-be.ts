import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions, STATUS, RequestInfo } from 'angular-in-memory-web-api';
import { User } from '../../types/user';
import { Observable, of } from 'rxjs';

interface AuthResponse {
  token: string;
  user: { id: number; username: string; role?: string };
}
@Injectable({
  providedIn: 'root'
})
export class MockBe implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 11, username: 'duong', firstName: 'Nguyen', secondName: 'A', age: 50, email:'nguyenA@gmail.com', password:"12345678" },
      { id: 12, username: 'trung', firstName: 'Nguyen', secondName: 'B', age: 50, email:'nguyenB@gmail.com', password:"12345678" },
      { id: 13, username: 'hoang', firstName: 'Nguyen', secondName: 'C', age: 50, email:'nguyenC@gmail.com', password:"12345678" },
      { id: 14, username: 'duogn', firstName: 'Nguyen', secondName: 'D', age: 50, email:'nguyenD@gmail.com', password:"12345678" },
      { id: 15, username: 'doung', firstName: 'Nguyen', secondName: 'E', age: 50, email:'nguyenE@gmail.com', password:"12345678" },

    ];
    // Các tên thuộc tính ở đây ('users') sẽ trở thành các endpoints API
    // Ví dụ: '/api/users'
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
  post(requestInfo:RequestInfo) : Observable<ResponseOptions>{
    if (requestInfo.url.endsWith('api/login')) {
      return this.handleLogin(requestInfo);
    }
    return undefined!; 
  }

  private handleLogin(requestInfo: RequestInfo): Observable<ResponseOptions> {
    const { headers, url } = requestInfo;
    // For now, we'll use mock data since RequestInfo doesn't provide direct body access
    // In a real implementation, you'd need to access the request body differently
    const { email, password } = { email: 'nguyenA@gmail.com', password: '12345678' }; // Mock data

    // 1. Tìm người dùng trong DB giả lập
    const users = this.createDb().users;
    const userFound = users.find(u => u.email === email && u.password === password);

    let responseOptions: ResponseOptions;

    if (userFound) {
      // 2. PHẢN HỒI THÀNH CÔNG (STATUS 200)
      const mockToken = btoa(userFound.username + Date.now()); // Tạo token giả
      
      const authResponse: AuthResponse = {
        token: mockToken,
        user: { id: userFound.id, username: userFound.username }
      };

      responseOptions = {
        body: authResponse,
        status: STATUS.OK, // 200
        headers,
        url,
      };
      
    } else {
      // 3. PHẢN HỒI THẤT BẠI (STATUS 401 Unauthorized)
      responseOptions = {
        body: { error: 'Tên đăng nhập hoặc mật khẩu không đúng.' },
        status: STATUS.UNAUTHORIZED, 
        headers,
        url,
      };
    }
    return of(responseOptions);
  }
}

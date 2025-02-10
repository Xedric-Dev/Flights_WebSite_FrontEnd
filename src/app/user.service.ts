import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './Models/User';
import { Observable} from 'rxjs';
import { environment } from './Environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = `${environment.apiUrl}/Users`

  constructor(private http : HttpClient) { }

    getUsers() : Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl)
    }
  
    getUsersById(id:number) : Observable<User>{
      return this.http.get<User>(`${this.apiUrl}/${id}`)
    }
  
    createUsers(user:User): Observable<User>{
      return this.http.post<User>(this.apiUrl,user)
    }
  
    deleteUser(id:number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    updateUser(user:User):Observable<User>{
      return this.http.put<User>(`${this.apiUrl}/${user.id}`,user)
    }
}

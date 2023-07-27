import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url
  constructor(
    private http: HttpClient
  ) { }

  async getTokenpath(path: any) {
    let url = this.url + path;
    let token = sessionStorage.getItem('accessToken') || null;
    if (!token) {
      return;
    }
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return new Promise((resolve, reject) => {
      this.http.get<any>(url, { headers: header }).subscribe({
        next: (res) => {
          resolve(res);
          console.log(1);
          
        },
        error: (error) => {
          reject(error);
          if(error.status === 401){
            window.location.href="/"
          }
        },
      });
    });
  }

  async postTokenpath(path: any, body: any) {
    let url = this.url + path;
    let token = sessionStorage.getItem('accessToken') || null;
    if (!token) {
      return;
    }
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return new Promise((resolve, reject) => {
      this.http.post<any>(url, body, { headers: header }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async patchTokenpath(path: any, body: any) {
    let url = this.url + path;
    let token = sessionStorage.getItem('accessToken') || null;
    if (!token) {
      return;
    }
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return new Promise((resolve, reject) => {
      this.http.patch<any>(url, body, { headers: header }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  async deleteTokenpath(path: any) {
    let url = this.url + path;
    let token = sessionStorage.getItem('accessToken') || null;
    if (!token) {
      return;
    }
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return new Promise((resolve, reject) => {
      this.http.delete<any>(url, { headers: header }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}

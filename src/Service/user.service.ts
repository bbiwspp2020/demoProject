import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url
  constructor(
    private http: HttpClient
  ) { }

  async signIn(path: any, body: any) {
    let url = this.url + path;
    return new Promise((resolve, reject) => {
      this.http.post<any>(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  async signInwithGoogle(path: any) {
    let url = this.url + path;
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.get<any>(url,{ headers: header }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

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

  // async PostTokenNoSprinner(path: any, body: any) {
  //   let url = this.url + path;
  //   let token = sessionStorage.getItem('accessToken') || null;
  //   if (!token) {
  //     return;
  //   }
  //   const header = new HttpHeaders({
  //     Authorization: 'Bearer ' + token,
  //   });
  //   return new Promise((resolve, reject) => {
  //     this.http.post<any>(url, body, { headers: header }).subscribe({
  //       next: (res) => {
  //         if (res.statusCode != 1000) {
  //           resolve(false);
  //         }
  //         resolve(res);
  //       },
  //       error: (error) => {
  //         reject(error);
  //       },
  //     });
  //   });
  // }
}

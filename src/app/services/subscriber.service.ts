import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  url: string = 'http://localhost:5000/api/'
  subscribedUser: any = ''
  constructor(private http: HttpClient) { }
  set setSubscribedUser(value: any) {
    this.subscribedUser = value
  }
  get getSubscribedUser() {
    return this.subscribedUser
  }
  subscriber(body: any) {
    return this.http.post(this.url + 'subscribe', body).pipe(
      map((result: any) => {
        console.log("result", result)
        this.setSubscribedUser = result
      })
    )
  }

  userSubscribed(id: number) {
    return this.http.post(this.url + 'get/subscried-user', {user_id: id}).pipe(
      map((result: any) => {
        console.log("result userSubscribed", result.user)
        this.setSubscribedUser = result.user
      })
    )
  }

  optMeal(body: any, id: any) {
    return this.http.put(this.url + 'opt-meal', {body, user_id: id}).pipe(
      map((result: any) => {
        console.log("result subscribed", result)
        this.setSubscribedUser = result
        console.log("getSubscribed", this.getSubscribedUser)
      })
    )
  }
}

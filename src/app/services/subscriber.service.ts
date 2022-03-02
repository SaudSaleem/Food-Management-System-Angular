import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { DishesService } from './dishes.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  url: string = 'http://localhost:5000/api/'
  subscribedUser: any = ''
  dishName : string = ''
  totalMeals: any = ''
  totalAmounnt: any = ''
  constructor(private http: HttpClient, private dishService: DishesService, private authService: AuthService) { }
  set setSubscribedUser(value: any) {
    this.subscribedUser = value
  }
  get getSubscribedUser() {
    return this.subscribedUser
  }
  set setDishName(value: any) {
    this.dishName = value
  }
  get getDishName() {
    return this.dishName
  }
  set setTotalMeals(value: any) {
    this.totalMeals = value
  }
  get getTotalMeals() {
    return this.totalMeals
  }
  set setTotalAmount(value: any) {
    this.totalAmounnt = value
  }
  get getTotalAmount() {
    return this.totalAmounnt
  }
  subscriber(body: any) {
    return this.http.post(this.url + 'subscribe', body).pipe(
      map((result: any) => {
        console.log("result subscibed user", result)
        this.setSubscribedUser = result
        this.setDishName = this.dishService.getDishes.find((item: any) => {
          return item.id == body.dish_id
        }).name
        this.findTotalMeals()
      })
    )
  }

  userSubscribed(id: number) {
    return this.http.post(this.url + 'get/subscried-user', {user_id: id}).pipe(
      map((result: any) => {
        this.setSubscribedUser = result.user
        this.setDishName = this.dishService.getDishes.find((item: any) => {
          return item.id == this.getSubscribedUser.dish_id
        }).name
        this.findTotalMeals()
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

  findTotalMeals() {
    let count = 0
    for(let item of this.getSubscribedUser.dates) {
      if(item.status == 'accepted') count = count+1
    }
    this.setTotalMeals = count
    this.setTotalAmount = (this.dishService.getDishes.find((item: any) => {
      return item.id == this.getSubscribedUser.dish_id
    }).price) * count
  }
}

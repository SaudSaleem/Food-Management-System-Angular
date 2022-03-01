import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  data: any = ''
  displayedColumns: string[] = ['meal', 'date', 'status', 'action'];
  dataSource: any = [];
  constructor(private subscriedService: SubscriberService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscribed()
    this.dataSource = this.subscriedService.getSubscribedUser.user?.dates
    console.log('datauser', this.data.user?.dates)
  }

  userSubscribed() {
    this.subscriedService.userSubscribed(this.authService.getLoginUser.id).subscribe(() => {})
  }

  rowData(row: any) {
    console.log("row data",row)
  }
  done() {
    console.log("body done")
  }
  
}

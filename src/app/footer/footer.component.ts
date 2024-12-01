import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  myDetails = [{
    name: "ABHIJITH K J",
    position: "Senior Software Engineer",
    email: "abhijithkzj@gmail.com",
    phone: "9645314534"
  }]

}

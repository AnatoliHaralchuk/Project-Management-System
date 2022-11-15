import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss']
})
export class CaruselComponent implements OnInit {
  counter = 0;
  developers = [
    {
      name: 'Anatoli Haralchuk',
      about: 'Nothing comes easy, but if you work hard, the result is inevitable!',
      img: 'https://anatoliharalchuk.github.io/rsschool-cv/assets/img/myFoto.jpg',
      subTitle: 'Teamlead, frontend developer'
    },
    {
      name: 'Dmitriy Kharitonov',
      img: 'https://avatars.githubusercontent.com/u/77116742?v=4',
      about: 'Dreams will come true. I will do everything for this!',
      subTitle: 'Frontend developer'
    },
    {
      name: 'Tukhtamishev Sanjar',
      img: 'https://avatars.githubusercontent.com/u/94516310?s=400&u=1c4396ca5e6844c1e6e0f6c989d9d520c83cd45a&v=4',
      subTitle: 'Frontend developer',
      about: 'Trust the next chapter, because you are the author!',
    }
  ]
  developer = this.developers[this.counter]

  constructor() { }

  ngOnInit(): void {
  }

  nextContent() {
    this.counter++;
    if(this.counter === this.developers.length) {
      this.counter = 0;
      this.developer = this.developers[this.counter]
    } else {
      this.developer = this.developers[this.counter]
    }
  }

  prevContent() {
    if(this.counter === 0) {
      this.counter = this.developers.length-1;
      this.developer = this.developers[this.counter]
    } else {
      this.counter--;
      this.developer = this.developers[this.counter]
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss'],
})
export class CaruselComponent implements OnInit {
  counter = 0;

  developers = [
    {
      name: 'carusel.name1',
      about: 'carusel.about1',
      img: 'https://anatoliharalchuk.github.io/rsschool-cv/assets/img/myFoto.jpg',
      subTitle: 'carusel.role1',
    },
    {
      name: 'carusel.name2',
      img: 'https://i.ibb.co/zJqjPqq/IMG-20210330-004732-173.jpg',
      about: 'carusel.about2',
      subTitle: 'carusel.role2',
    },
    {
      name: 'carusel.name3',
      img: 'https://avatars.githubusercontent.com/u/94516310?s=400&u=1c4396ca5e6844c1e6e0f6c989d9d520c83cd45a&v=4',
      about: 'carusel.about3',
      subTitle: 'carusel.role3',
    },
  ];

  developer = this.developers[this.counter];

  constructor() {}

  ngOnInit(): void {}

  nextContent() {
    this.counter++;
    if (this.counter === this.developers.length) {
      this.counter = 0;
      this.developer = this.developers[this.counter];
    } else {
      this.developer = this.developers[this.counter];
    }
  }

  prevContent() {
    if (this.counter === 0) {
      this.counter = this.developers.length - 1;
      this.developer = this.developers[this.counter];
    } else {
      this.counter--;
      this.developer = this.developers[this.counter];
    }
  }
}

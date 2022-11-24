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
      name: 'Анатолий Горальчук',
      about: 'Он всегда планировал жизнь, а она всегда методично разрушала его планы.',
      img: 'https://anatoliharalchuk.github.io/rsschool-cv/assets/img/myFoto.jpg',
      subTitle: 'Фронтенд-лидер',
    },
    {
      name: 'Дмитрий Андреевич',
      img: 'https://i.ibb.co/zJqjPqq/IMG-20210330-004732-173.jpg',
      about: 'Когда-то он планировал стать славным малым, а стал просто стариком.',
      subTitle: 'Фронтенд-мастер',
    },
    {
      name: 'Санжар Тухтамышев',
      img: 'https://avatars.githubusercontent.com/u/94516310?s=400&u=1c4396ca5e6844c1e6e0f6c989d9d520c83cd45a&v=4',
      about: 'Однажды он запланировал выполнить этот проект, но бросил, так и не начав.',
      subTitle: 'Фронтенд-эксперт',
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

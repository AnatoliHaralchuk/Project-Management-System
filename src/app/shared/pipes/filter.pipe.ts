import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/project-management/models/management.models';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(items: Board[], search: string = ''): Board[] {
    let cards: Board[];
    search = search.trim();
    if (!search) {
      return items;
    } else {
      cards = items.filter((el) => {
        return el.title.includes(search) || el.description.includes(search);
      });
    }
    // this.data.isItems = cards.length === 0 ? false : true;
    return cards;
  }

}

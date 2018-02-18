import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './links.model';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  transform(links: Link[], searchStr: string): any {
    if (!links || links.length == 0) return links;
    if (searchStr[0] === '#') {
      searchStr = searchStr.substring(1,searchStr.length);
      return links.filter((link) => {
         return link.tags.filter(tag => tag.toLowerCase().includes(searchStr.toLowerCase())).length > 0
      });
    } else{
      return links.filter((link) => {
        return link.title.toLowerCase().includes(searchStr.toLowerCase())       
      });
    }
    
  }

}

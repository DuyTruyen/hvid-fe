import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bannerType'
})
export class BannerTypePipe implements PipeTransform {

    transform(type: any): string {
        const parsed = parseInt(type);
        switch (parsed) {
            case 1: return 'Box khuyến mại';
            default: return '';
        }
    }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BannersService } from 'src/app/services/banners.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AppConfigService } from 'src/app/shared/app-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from '../../../shared/constants/constants';


@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
    breadcrumbItem: MenuItem[];
    home: MenuItem;

    listItems: any = [];
    totalItemCount = 0;
    loading = false;
    cols: any[] = [];
    url: any;
    msg = "";
    bannersForm: FormGroup;
    selectedItem: any;

    bannersDialogHeader = '';

    searchData = {
        skip: 0,
        take: 40,
    };

    searchForm = {
        type: null,
        name: '',
        IsDisabled: null,
        take: this.searchData.take,
        skip: this.searchData.skip,
    };
    BANNERS_TYPE = Constants.BANNERS_TYPE;
    BANNERS_ISDISABLEA = Constants.BANNERS_ISDISABLEA;

    constructor(
        private bannersAPI: BannersService,
        private notification: NotificationService,
        private fileUploadAPI: FileUploadService,
        protected configService: AppConfigService,
        private fb: FormBuilder,
    ) {
        this.bannersForm = this.fb.group({
            id : [null],
            type: [null],
            link: [null],
        });
            this.breadcrumbItem = [
                { label: 'Quản lý banners' },
                { label: 'Danh sách banners' },
            ];

        this.home = {
            icon: 'pi pi-home',
            routerLink: '/admin/admin-dashboard',
        };
    }

    ngOnInit(): void {
        this.cols = [
            { field: 'name', header: 'Tên banner', width: '16rem' },
        ];
        this.search();
    }

    search() {
        this.loading = true;
        this.bannersAPI.getAll().subscribe({
            next: (res) => {
                if(res.data != undefined) {
                    this.listItems = res.data;
                    console.log('listItems', this.listItems);
                    this.totalItemCount = res.total;
                } else {
                    if( res.errors && res.errors.length > 0) {
                        res.errors.forEach((el: any) => {
                            this.notification.error(el.errorMessage);
                        });
                    } else {
                        this.notification.error('Tìm kiếm không thành công');
                    }
                }
            }
        }).add(() => {
            this.loading = false
        })
    }

    onSearch(){
        this.searchForm = {
            type: null,
            name: '',
            IsDisabled: null,
            take: this.searchData.take,
            skip: this.searchData.skip,
        };
        this.search();
    }

    onClearSearch(){
        this.searchForm.skip = 0;
        this.searchForm.take = 40;
        this.search();
    }

    selectItem(item: any) {
        this.selectedItem = item;
    }

    onPageChange(data: any) {
        this.searchData.skip = data.first;
        this.searchData.take = data.rows;
        this.search();
    }

}

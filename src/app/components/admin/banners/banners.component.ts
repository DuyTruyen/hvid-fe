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
    selectedImg: string = '';
    bannersDialogHeader = 'Sửa banner';
    visibleImage: boolean = false;
    visibleEdit: boolean = false;
    blobChoosenFile: any = null;
    searchData = {
        skip: 0,
        take: 40,
    };
    searchForm = {
        type: null,
        name: '',
        isDisabled: null,
        take: this.searchData.take,
        skip: this.searchData.skip,
    };
    BANNERS_TYPE = Constants.BANNERS_TYPE;
    BANNERS_ISDISABLEA = Constants.BANNERS_ISDISABLEA;
    baseURL: any = '';

    constructor(
        private bannersAPI: BannersService,
        private notification: NotificationService,
        private fileUploadAPI: FileUploadService,
        protected configService: AppConfigService,
        private fb: FormBuilder,
    ) {
        this.bannersForm = this.fb.group({
            id: [null],
            type: [null],
            name: [null],
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
        this.bannersAPI.getAll(this.searchForm).subscribe({
            next: (res) => {
                if (res.data != undefined) {
                    this.listItems = res.data;
                    this.totalItemCount = res.total;
                } else {
                    if (res.errors && res.errors.length > 0) {
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

    onSearch() {
        this.searchForm = {
            type: null,
            name: '',
            isDisabled: null,
            take: this.searchData.take,
            skip: this.searchData.skip,
        };
        this.search();
    }

    onClearSearch() {
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

    showDialogImage(data: any) {
        this.visibleImage = true;
        this.selectedImg = data;
    }

    onEditItem(item: any) {
        this.visibleEdit = true;
        this.selectedItem = item;
        this.bannersForm.patchValue({
            id: item.id,
            type: item.type,
            name: item.name,
        });
        this.url = item.link;
        const prefixToRemove = "https://hvidtest-api.pmr.vn/";
        const remainingPart = this.url.replace(prefixToRemove, "");
        this.baseURL = remainingPart;
    }

    updateItem() {
        this.bannersAPI.update(this.selectedItem.id, { ...this.bannersForm.value, link: this.baseURL }).subscribe({
            next: (res) => {
                if (res.ret && res.ret[0].code == 200) {
                    this.notification.success('Cập nhật banner thành công', '');
                    this.visibleEdit = false;
                    this.url = '';
                    this.search();
                } else {
                    if (res.errors && res.errors.length > 0) {
                        res.errors.forEach((el: any) => {
                            this.notification.error(el.errorMessage);
                        });
                    } else if (res.ret) {
                        this.notification.error('Cập nhật bài viết không thành công! Error: ' + res.ret[0].message);
                    } else {
                        this.notification.error('Cập nhật bài viết không thành công! Error: unknown');
                        console.error(res);
                    }
                }
            },
        });
    }

    doUploadImage() {
        if (this.doUploadImage != null) {
            this.fileUploadAPI.upload(this.blobChoosenFile).subscribe({
                next: (res) => {
                    if (res.filePath) {
                        const config = this.configService.getConfig();
                        this.url = config.api.fileUrl + '/' + res.filePath;
                        this.updateItem();
                    } else {
                        this.notification.error('Upload ảnh không thành công!', (res.msg != undefined) ? res.msg : 'Unknown error.');
                    }
                }
            });
        }
    }

    onSaveItem() {
        if (this.bannersForm.valid) {
            if (this.blobChoosenFile != null) {
                this.doUploadImage();
            }
            else {
                this.updateItem();
            }
        }
        else {
            Object.values(this.bannersForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    toggleEnable(item: any) {
        let payload = {
            id: item.id,
            type: item.type,
            name: item.name,
            link: item.link,
            isDisabled: item.isDisabled,
        };
        this.bannersAPI.update(item.id, payload).subscribe({
            next: (res) => {
                if (res.ret && res.ret[0].code == 200) {
                    this.notification.success(
                        'Cập nhật trạng thái thành công',
                        ''
                    );
                    this.search();
                } else {
                    if (res.errors && res.errors.length > 0) {
                        res.errors.forEach((el: any) => {
                            this.notification.error(el.errorMessage);
                        });
                    }
                    else {
                        this.notification.error('Cập nhật trạng thái không thành công');
                    }
                }
            },
        });
    }

    selectFile(event: any) {
        if (!event.target.files[0] || event.target.files[0].length == 0) {
            this.msg = 'You must select an image';
            return;
        }
        let mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.msg = "Only images are supported";
            return;
        }
        this.blobChoosenFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            this.msg = "";
            this.url = reader.result;
        }
    }

}

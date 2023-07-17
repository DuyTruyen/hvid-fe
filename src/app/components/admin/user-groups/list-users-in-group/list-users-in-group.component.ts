import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAuthModel, INIT_AUTH_MODEL } from 'src/app/models/auth-model';
import { UserGroupService } from 'src/app/services/user-group.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants/constants';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'list-users-in-group',
  templateUrl: './list-users-in-group.component.html',
  styleUrls: ['./list-users-in-group.component.scss']
})
export class ListUsersInGroupComponent implements OnInit {
  ACTIONS = Constants.ACTIONS;
  cols: any[] = [];
  users: any = [];
  isVisibleDeleteItemDialog = false;
  textConfirmDelete = '';
  deletedItem: any = {};
  loading = false;
  selectedUser = INIT_AUTH_MODEL;
  filteredUsers: any[] = [];

  @Input() userGroup: any = {};

  _groupId = '';
  @Input() set groupId(value: string) {
    this._groupId = value;
    if (value) {
      // console.log('value: _groupId', this._groupId);
      this.getUsersInGroup();
    }
  }

  get groupId() {
    return this._groupId;
  }

  _visible = false;
  @Input() set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
    this.selectedUser = INIT_AUTH_MODEL;
  }
  get visible() {
    return this._visible;
  }
  @Output() visibleChange = new EventEmitter<any>();

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.cols = [
      { field: 'username', header: 'Tài khoản', width: '30%' },
      { field: 'fullname', header: 'Tên', width: '40%' },
    ];
  }

  ngOnInit(): void {
  }

  getUsersInGroup() {
    this.loading = true;
    this.userGroupService.getUsersInGroup(this.groupId).subscribe({
      next: (res) => {
        if (res.isValid) {
          this.users = res.jsonData;
        }else {
            if(res.errors && res.errors.length > 0){
                res.errors.forEach((el: any) => {
                    this.notification.error(el.errorMessage)
                })
            }else{
                this.notification.error('Lấy dữ liệu nhóm không thành công')
            }
        }
      }
    }).add(() => {
      this.loading = false
    });
  }
  onDeleteItem(item: any) {
    this.textConfirmDelete = `Xác nhận xóa user <b>${item.fullname}</b> khỏi nhóm?`
    this.deletedItem = item;
    this.isVisibleDeleteItemDialog = true;
  }
  addUser() {
    this.userGroupService.addUser(this.selectedUser?.userId ?? '', this.groupId).subscribe({
      next: (res) => {
        if (res.isValid) {
          this.notification.success('Thêm user thành công', '');
          this.getUsersInGroup();
          this.clearSelectedUser();
        }else{
            if(res.errors && res.errors.length > 0){
                res.errors.forEach((el: any) => {
                    this.notification.error(el.errorMessage)
                })
            }else{
                this.notification.error('Thêm mới user không thành công')
            }
        }
      }
    });
  }

  clearSelectedUser(){
    this.selectedUser={}
  }
  removeUser() {
    this.userGroupService.removeUser(this.deletedItem.id, this.groupId).subscribe({
      next: (res) => {
        if (res.isValid) {
          this.notification.success('Xóa user thành công', '');
          this.isVisibleDeleteItemDialog = false;
          this.getUsersInGroup();
        }else {
            if(res.errors && res.errors.length > 0){
                res.errors.forEach((el: any) => {
                    this.notification.error(el.errorMessage)
                })
            }else{
                this.notification.error('Xóa user không thành công')
            }
        }
      }
    });
  }
  filterUser(data: any) {
    let payload = {
      skip: 0,
      take: 10,
      keyword: data.query
    }
    this.userService.search(payload).subscribe({
      next: (res) => {
        if (res.isValid) {
          this.filteredUsers = [];
          res.jsonData.forEach((u:any) => {
            this.filteredUsers.push({
              userId: u.id,
              userName: u.username,
              fullName: u.fullname,
              label: u.fullname + ' - ' + u.username
            });
          });
        }
      }
    });
  }
}

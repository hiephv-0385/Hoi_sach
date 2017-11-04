export interface BaseModel {
    id?: string;
    updatedOn?: string;
    createdOn?: string;
    isActive: boolean;
}

export interface AdminUser extends BaseModel {
    firstName: string;
    lastName: string;
    email: number;
    avatar: string;
    password: string;
    isSupperUser: boolean;
}

export interface ExtendedAdminUser extends AdminUser {
    isChecked?: boolean;
}

export interface AdminUserListResponse {
    count: number;
    data: ExtendedAdminUser[];
}

export interface UploadResult {
    fileName: string;
    status: number;
}

export interface ResponseNotify {
    isSuccess: boolean;
    message: string;
}

export interface UpdateAdminUserDto {
    firstName: string;
    lastName: string;
    avatar?: string;
    isActive: boolean;
}

export interface Avatar {
    fileName: string;
}

export interface GetAdminUsersParams {
    offset?: number;
    limit?: number;
}

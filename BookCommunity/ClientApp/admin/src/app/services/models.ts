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

export interface UploadResult {
    fileName: string;
    status: number;
}

export interface ResponseNotify {
    isSuccess: boolean;
    message: string;
}

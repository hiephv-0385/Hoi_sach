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

export interface ListResponse {
    count: number;
}

export interface AdminUserListResponse extends ListResponse {
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

export interface PagingRequest {
    offset?: number;
    limit?: number;
}

export interface GetAdminUsersParams extends PagingRequest {
    email?: string;
}

export interface Country extends BaseModel {
    name: string;
    code: string;
    sort: number;
    flag: string;
}

export interface ExtendedCountry extends Country {
    isChecked?: boolean;
}

export interface GetCountriesParams extends PagingRequest {
    name?: string;
    code?: string;
}

export interface CountryListResponse extends ListResponse {
    data: ExtendedCountry[];
}

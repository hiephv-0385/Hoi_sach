export interface UploadResult {
    fileName: string;
    status: number;
}

export interface ResponseNotify {
    isSuccess: boolean;
    message: string;
}

export interface PagingRequest {
    offset?: number;
    limit?: number;
}

export interface ListResponse<T> {
    count: number;
    data: T[];
}

export interface BaseModel {
    id?: string;
    updatedOn?: string;
    createdOn?: string;
    isActive: boolean;
    isChecked?: boolean;
}

// User
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

export interface UpdateAdminUserDto {
    firstName: string;
    lastName: string;
    avatar?: string;
    isActive: boolean;
}

export interface Avatar {
    fileName: string;
}

export interface GetAdminUsersParams extends PagingRequest {
    email?: string;
}

// Country
export interface Country extends BaseModel {
    name: string;
    code: string;
    sort: number;
    flag: string;
}

export interface GetCountriesParams extends PagingRequest {
    name?: string;
    code?: string;
}

// Author
export interface Author extends BaseModel {
    fullName: string;
    birthday: string;
    picture: string;
    introduction: string;
    country: Country;
}

export interface GetAuthorsParams extends PagingRequest {
    fullName?: string;
}

// Release company
export interface ReleaseCompany extends BaseModel {
    name: string;
    logo: string;
    country: Country;
}

export interface GetReleaseCompaniesParams extends PagingRequest {
    name?: string;
}

// Publisher
export interface Publisher extends BaseModel {
    name: string;
    logo: string;
    country: Country;
}

export interface GetPublisherParams extends PagingRequest {
    name?: string;
}

// Publisher
export interface BookCategory extends BaseModel {
    name: string;
    picture: string;
    parent: BookCategory;
}

export interface GetBookCategoryParams extends PagingRequest {
    name?: string;
}


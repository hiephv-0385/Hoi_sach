export interface UserCredential {
    email: string;
    password: string;
    isRememberMe: boolean;
}

export interface ErrorInfo {
    message?: string;
}

export interface UploadedFile {
    id?: string;
    fileName: string;
}

export interface UploadResult {
    fileName: string;
    uploadedFiles: UploadedFile[];
    status: number;
}

export interface ResponseNotify {
    isSuccess: boolean;
    message: string;
}

export interface PagingRequest extends QueryParams {
    offset?: number;
    limit?: number;
}

export interface QueryParams {
    [key: string]: string | number | boolean | undefined;
}

export interface ListResponse<T> {
    count: number;
    items: T[];
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

export interface AdminUserModel extends AdminUser {
}

export interface UpdateAdminUserModel {
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
    sort: number;
    picture: string;
    parent: BookCategory;
}

export interface GetBookCategoryParams extends PagingRequest {
    name?: string;
    parentId?: string;
}

// Book
export interface Book extends BaseModel {
    name: string;
    pageCount: number;
    publishedYear: number;
    summary: string;
    buyAddress: string;
    publisher:  Publisher;
    releaseCompany: ReleaseCompany;
    author: Author;
    bookCategory: BookCategory;
}

export interface BookModel extends BaseModel {
    name: string;
    pageCount: number;
    publishedYear: number;
    summary: string;
    author: Author;
    bookCategory: BookCategory;
}

export interface BookImage extends BaseModel {
    bookId: string;
    sort?: number;
    imageUrl: string;
}

export interface StoredBookModel {
    book: Book;
    images: BookImage[];
}

export interface GetBookParams extends PagingRequest {
    name?: string;
    categoryId?: string;
}

export interface BookAvatar extends Avatar {
    imageId: string;
}



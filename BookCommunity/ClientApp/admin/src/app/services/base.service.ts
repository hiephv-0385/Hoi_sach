export class BaseService {
    public apiUrl: string;
    public csrfToken: string;

    constructor(apiUrl: string, csrfToken: string) {
        this.apiUrl = apiUrl;
        this.csrfToken = csrfToken;
    }
}

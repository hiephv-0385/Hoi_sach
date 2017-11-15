import { QueryParams } from "./models";

export class BaseService {
    public joinUrlParams(params: QueryParams): string {
        const queryParams = new URLSearchParams();
        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }

            let value = params[key];
            if (!value) {
                continue;
            }

            if (typeof value === "number" || typeof value === "boolean") {
                value = value.toString();
            }

            queryParams.append(key, value);
        }

        return queryParams.toString();
    }
}

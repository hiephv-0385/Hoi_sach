import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ConfimService {
    private confirmLoginSource = new Subject<boolean>();

    public confirmLogin$ = this.confirmLoginSource.asObservable();

    confirmLogin(isLogin: boolean) {
        this.confirmLoginSource.next(isLogin);
    }
}

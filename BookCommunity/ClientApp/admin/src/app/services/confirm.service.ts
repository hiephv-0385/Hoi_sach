import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ConfimService {

    // Observable string sources
    private confirmLoginSource = new Subject<boolean>();

    // Observable string streams
    public confirmLogin$ = this.confirmLoginSource.asObservable();

    confirmLogin(isLogin: boolean) {
        this.confirmLoginSource.next(isLogin);
    }
}

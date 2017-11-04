import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

import { ResponseNotify } from "../../services/models";

@Component({
    selector: "app-alert-message",
    templateUrl: "./alet.message.component.html",
    styleUrls: ["./alert.message.component.css"]
})
export class AlertMessageComponent {

    @Input() public notify: ResponseNotify;

    public hideAlert(): void {
        this.notify = null;
    }
}

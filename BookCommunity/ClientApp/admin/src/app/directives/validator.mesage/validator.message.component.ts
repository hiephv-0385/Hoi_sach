import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-validator-message",
    templateUrl: "./validator.message.component.html"
})
export class ValidatorMessageComponent {

    @Input() public control: FormControl;

    @Input() public name: string;
}

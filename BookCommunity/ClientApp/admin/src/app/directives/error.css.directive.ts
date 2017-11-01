import { ElementRef, Directive, Input, HostListener, Renderer2 } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive({
    selector: "[adminErrorCss]"
})
export class ErrorCssDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @Input() public input: FormControl;

    @HostListener("mouseleave") onMouseLeave() {
        this.setInpuValidationClass(this.input);
    }

    @HostListener("blur") onMouseBlur() {
        this.setInpuValidationClass(this.input);
    }

    public setInpuValidationClass(input: FormControl): void {
        if (!input.dirty && !input.touched) {
            return;
        }

        const inputContainer = this.el.nativeElement.parentNode;
        if (inputContainer) {
            const successClass = "has-success";
            const errorClass = "has-error";
            const css = input.valid ? successClass : errorClass;

            this.renderer.removeClass(inputContainer, successClass);
            this.renderer.removeClass(inputContainer, errorClass);
            this.renderer.addClass(inputContainer, css);
        }
    }
}

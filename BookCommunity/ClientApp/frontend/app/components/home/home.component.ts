import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
    isLaunched = false;
    fillerContent = Array(30);
    fixed = false;
    coverHeader = false;
    showHeader = false;
    showFooter = false;
    modeIndex = 0;
    get mode() { return ['side', 'over', 'push'][this.modeIndex]; }
    get fixedTop() { return this.fixed && this.showHeader && !this.coverHeader ? 64 : 0; }
    get fixedBottom() { return this.fixed && this.showFooter && !this.coverHeader ? 64 : 0; }
  }

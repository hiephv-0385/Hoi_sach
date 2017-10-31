import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface User {
    name: string;
    email: string;
    age: number;
    city: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {
    public data: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            const user: User = {
                name: `Name-${i}`,
                email: `example-${i}@gmail.com`,
                age: i + 1,
                city: `City-${i}`
            };

            this.data.push(user);
        }
    }

    public addUser(): void {
        this.router.navigate(['/users'])
            .then(() => this.router.navigate(['/users/add'], { replaceUrl: true }));
    }
}

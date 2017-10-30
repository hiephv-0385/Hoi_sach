import { Component, OnInit } from '@angular/core';

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
    constructor() { }

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
}

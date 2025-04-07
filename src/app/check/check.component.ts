import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-check',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './check.component.html',
    styleUrl: './check.component.scss',
})
export class CheckComponent implements OnInit {
    checkList: string[] = [];
    tel1: string = '';
    tel2: string = '';
    tel3: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.checkList = params['check'];
            this.tel1 = params['tel1'];
            this.tel2 = params['tel2'];
            this.tel3 = params['tel3'];
        });
    }
}

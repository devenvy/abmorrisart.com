import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'abma-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
    private rollBack?: any;
    private routechange?: Subscription;

    menuIsOpen = false;

    @ViewChild('navbar') navbar?: ElementRef;
    @ViewChild('toggle') toggle?: ElementRef;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.routechange = this.router.events.subscribe(evt => {
            if (evt instanceof NavigationEnd) {
                this.menuIsOpen = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.routechange?.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.toggle?.nativeElement.addEventListener('click', (evt: Event) => {
            this.toggleMenu();
            evt.preventDefault();
        });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll($event: Event): void {
        if (!this.navbar) {
            return;
        }

        // todo: fix infinite loop
        // if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        //     this.navbar.nativeElement.style.height = '60px';
        // } else {
        //     this.navbar.nativeElement.style.height = '';
        // }
    }

    toggleHorizontal(): void {
        this.navbar?.nativeElement.classList.remove('closing');
        [].forEach.call(
            this.navbar?.nativeElement.querySelectorAll('.custom-can-transform'),
            el => {
                // el.classList.toggle('pure-menu-horizontal');
            }
        );
    }

    toggleMenu(): void {
        this.menuIsOpen = !this.menuIsOpen;
        console.log(this.menuIsOpen);
    }
}

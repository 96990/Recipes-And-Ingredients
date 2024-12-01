import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;
    
    /* this is only for the dropdown to work when toggeling*/
    /*@HostListener('click') toggleOpem(){
        this.isOpen = !this.isOpen;
    }*/

    /* this is only for the dropdown to work when click where ever on the document */
    @HostListener('document:click', ['$event']) toggleOpen(event: Event){
        console.log(event.target);
        console.log(this.elRef.nativeElement);
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef){}
}
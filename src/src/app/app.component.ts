import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { faArrowCircleLeft, faArrowCircleRight, faBars, faBell, faChartArea, faComment, faDonate, faEnvelope, faExclamationTriangle, faFileAlt, faSearch, faTable, faTachometerAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
 
  showIcons = true;

  icons = {
    activeIconDashboard: faTachometerAlt,
    chartAreaIcon: faChartArea,
    tablesIcon: faTable,
    leftArrowIcon: faArrowCircleLeft,
    rightArrowIcon: faArrowCircleRight,
    faBars: faBars,
    faSeach: faSearch,
    faFileAlt: faFileAlt,
    faDonateText: faDonate,
    faExclamateTriagle: faExclamationTriangle,
    faBell: faBell,
    faEnvelope: faEnvelope
  }


  @ViewChild('togglerButton') togglerButton!: ElementRef;
  @ViewChild('ulSidebar') ulSidebar!: ElementRef;
  @ViewChild('sidebarToggleTop') sidebarToggleTop!: ElementRef;

  title!: any;

  isCollapsed = false;



  ngAfterViewInit(): void {


    this.togglerButton.nativeElement.onclick = (ev : Event) => {
      this.toggleClass('toggled',this.ulSidebar);
    } 

    this.sidebarToggleTop.nativeElement.onclick = (ev : Event) => {
      this.toggleClass('toggled',this.ulSidebar);
    } 
  }


  toggleClass(cl : string, element: ElementRef){
    if(element.nativeElement.classList.contains(cl)){
      element.nativeElement.classList.remove(cl)
    } else {
      element.nativeElement.classList.add(cl)
    }

    this.showIcons = !this.showIcons;

  }


}



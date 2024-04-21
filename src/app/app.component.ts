import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { JwtService } from './service/jwt.service';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private jwtService: JwtService) { }

  ngOnInit() {
    if (this.jwtService.hasAnyRole()) {
      this.router.navigate(['/objects'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}

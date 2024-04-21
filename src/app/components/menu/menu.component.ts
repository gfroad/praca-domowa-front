import { Component, EventEmitter, Output } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();

  constructor(private jwtService: JwtService) { }

  public hasAnyRole(): boolean {
    return this.jwtService.hasAnyRole();
  }
}


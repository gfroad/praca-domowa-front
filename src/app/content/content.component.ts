import { Component, OnInit } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AxiosService } from '../axios.service';
import { OrangeobjectComponent } from '../orangeobject/orangeobject.component';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, LoginFormComponent, OrangeobjectComponent, MenuComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  componentToShow: string = 'welcome';

  constructor(private axiosService: AxiosService) {}

	ngOnInit(): void {
		if (this.axiosService.getAuthToken() !== null) {
			this.componentToShow = "objects";
		}
	}

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/auth/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "objects";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
		);

	}

  onLogout(): void {
    this.axiosService.setAuthToken(null);
    this.componentToShow = "welcome";
  }
}

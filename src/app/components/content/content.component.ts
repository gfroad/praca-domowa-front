import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AxiosService } from '../../service/axios.service';
import { OrangeobjectComponent } from '../orangeobject/orangeobject.component';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';

@Component({
	selector: 'app-content',
	standalone: true,
	imports: [CommonModule, LoginFormComponent, OrangeobjectComponent, MenuComponent],
	templateUrl: './content.component.html',
	styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

	constructor(private axiosService: AxiosService, private jwtService: JwtService, private router: Router) { }

	public ngOnInit(): void {
		if (this.jwtService.getAuthToken() !== null) {
		}
	}

	public onLogin(input: any): void {
		this.axiosService.request(
			"POST",
			"/auth/login",
			{
				login: input.login,
				password: input.password
			}).then(
				response => {
					this.jwtService.setAuthToken(response.data.token);
					this.router.navigate(["/objects"]);
				}).catch(
					error => {
						this.jwtService.setAuthToken(null);
					}
				);

	}

	public onLogout(): void {
		this.jwtService.setAuthToken(null);
		this.router.navigate(["/login"]);
	}
}

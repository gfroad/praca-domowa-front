import { Component, OnInit, ViewChild } from '@angular/core';
import { OrangeObject } from '../../model/orangeobject';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../../service/axios.service';
import { FormsModule, NgForm } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-orangeobject',
  standalone: true,
  imports: [CommonModule,FormsModule, MenuComponent],
  templateUrl: './orangeobject.component.html',
  styleUrl: './orangeobject.component.css'
})
export class OrangeobjectComponent implements OnInit {
  public orangeObjects: OrangeObject[] = [];
  public editOrangeObject: OrangeObject | undefined;
  public deleteOrangeObject: OrangeObject | undefined;

  constructor(private axiosService: AxiosService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.getOrangeObjects();
  }

  public getOrangeObjects(): void {
    this.axiosService.request("GET", "/orange/objects", {}).then(
      (response) => {
        this.orangeObjects = response.data;
        this.orangeObjects = this.orangeObjects.sort((a, b) => a.id - b.id);;
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.jwtService.setAuthToken(null);
          } else {
            console.log(error.response.code);
          }
        });
  }

  public onCreateObject(addForm: NgForm): void {
    $('#addModal').modal('hide');
    this.axiosService.request("POST", "/orange/objects", addForm.value).then(
      (response) => {
        this.getOrangeObjects();
      }).catch(
        (error) => {
          alert(error.message);
        });
  }

  public onUpdateObject(orangeObject: OrangeObject): void {
    $('#editModal').modal('hide');
    this.axiosService.request("PUT", "/orange/objects/" + orangeObject.id, orangeObject).then(
      (response) => {
        this.getOrangeObjects();
      }).catch(
        (error) => {
          alert(error.message);
        });
  }

  public onDeleteObject(orangeObjectId: number): void {
    $('#deleteModal').modal('hide');
    this.axiosService.request("DELETE", "/orange/objects/" + orangeObjectId, {}).then(
      (response) => {
        this.getOrangeObjects();
      }).catch(
        (error) => {
          alert(error.message);
        });
  }


  public onOpenUpdateModal(orangeObject: OrangeObject) {
    this.editOrangeObject = orangeObject;
    $('#editModal').modal('show');
  }

  public onOpenDeleteModal(orangeObject: OrangeObject) {
    this.deleteOrangeObject = orangeObject;
    $('#deleteModal').modal('show');
  }

  public hasRole(role: string): boolean {
    return this.jwtService.hasRole(role);
  }

  public onLogout(): void {
    this.jwtService.setAuthToken(null);
    this.router.navigate(["/login"]);
  }
}

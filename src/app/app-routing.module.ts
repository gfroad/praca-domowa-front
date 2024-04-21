import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { OrangeobjectComponent } from "./components/orangeobject/orangeobject.component";

const routers : Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "objets", component: OrangeobjectComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

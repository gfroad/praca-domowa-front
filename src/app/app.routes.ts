import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrangeobjectComponent } from "./components/orangeobject/orangeobject.component";
import { ContentComponent } from "./components/content/content.component";

export const routes : Routes = [
    {path: "login", component: ContentComponent},
    {path: "objects", component: OrangeobjectComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
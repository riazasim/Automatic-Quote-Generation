import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServeyOneComponent } from './Component/servey-one/servey-one.component';
import { ServeyTwoComponent } from './Component/servey-two/servey-two.component';
import { ServeyThreeComponent } from './Component/servey-three/servey-three.component';
import { ServeyFourComponent } from './Component/servey-four/servey-four.component';
import { ServeyFiveComponent } from './Component/servey-five/servey-five.component';
import { ServeySixComponent } from './Component/servey-six/servey-six.component';
import { ServeySevenComponent } from './Component/servey-seven/servey-seven.component';
import { ServeyEightComponent } from './Component/servey-eight/servey-eight.component';
import { ServeyNineComponent } from './Component/servey-nine/servey-nine.component';
import { ServeyElevenComponent } from './Component/servey-eleven/servey-eleven.component';
import { ServeyTenComponent } from './Component/servey-ten/servey-ten.component';
import { ServeyTwelveComponent } from './Component/servey-twelve/servey-twelve.component';
import { ServeyThirteenComponent } from './Component/servey-thirteen/servey-thirteen.component';
import { ServeyFourteenComponent } from './Component/servey-fourteen/servey-fourteen.component';
import { ServeyFifteenComponent } from './Component/servey-fifteen/servey-fifteen.component';
import { ServeySixteenComponent } from './Component/servey-sixteen/servey-sixteen.component';
import { ServeySeventeenComponent } from './Component/servey-seventeen/servey-seventeen.component';
import { ServeyEighteenComponent } from './Component/servey-eighteen/servey-eighteen.component';
import { ServeyNineteenComponent } from './Component/servey-nineteen/servey-nineteen.component';
import { ServeyTwentyComponent } from './Component/servey-twenty/servey-twenty.component';
import { ServeyTwentyoneComponent } from './Component/servey-twentyone/servey-twentyone.component';
import { ServeyTwentytwoComponent } from './Component/servey-twentytwo/servey-twentytwo.component';
import { ServeyTwentythreeComponent } from './Component/servey-twentythree/servey-twentythree.component';
import { ServeyTwentyfourComponent } from './Component/servey-twentyfour/servey-twentyfour.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: 'step-one', component: ServeyOneComponent },
  // { path: 'step-two', component: ServeyTwoComponent },
  // { path: 'step-three', component: ServeyThreeComponent },
  // { path: 'step-four', component: ServeyFourComponent },
  // { path: 'step-five', component: ServeyFiveComponent },
  // { path: 'step-six', component: ServeySixComponent },
  // { path: 'step-seven', component: ServeySevenComponent },
  // { path: 'step-eight', component: ServeyEightComponent },
  // { path: 'step-nine', component: ServeyNineComponent },
  // { path: 'step-ten', component: ServeyTenComponent },
  // { path: 'step-eleven', component: ServeyElevenComponent },
  // { path: 'step-twelve', component: ServeyTwelveComponent },
  // { path: 'step-thirteen', component: ServeyThirteenComponent },
  // { path: 'step-fourteen', component: ServeyFourteenComponent },
  // { path: 'step-fifteen', component: ServeyFifteenComponent },
  // { path: 'step-sixteen', component: ServeySixteenComponent },
  // { path: 'step-seventeen', component: ServeySeventeenComponent },
  // { path: 'step-eighteen', component: ServeyEighteenComponent },
  // { path: 'step-nineteen', component: ServeyNineteenComponent },
  // { path: 'step-twenty', component: ServeyTwentyComponent },
  // { path: 'step-twentyone', component: ServeyTwentyoneComponent },
  // { path: 'step-twentytwo', component: ServeyTwentytwoComponent },
  // { path: 'step-twentythree', component: ServeyTwentythreeComponent },
  // { path: 'step-twentyfour', component: ServeyTwentyfourComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

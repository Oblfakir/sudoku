import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GameComponent} from './containers/game/game.component';
import {StartComponent} from './containers/start/start.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'game'
	},
	{
		path: 'game',
		component: GameComponent
	},
	{
		path: 'start',
		component: StartComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

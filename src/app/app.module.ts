import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SudokuComponent} from './components/sudoku/sudoku.component';
import {GameComponent} from './containers/game/game.component';
import { StartComponent } from './containers/start/start.component';
import { SudokuCellComponent } from './components/sudoku-cell/sudoku-cell.component';

@NgModule({
	declarations: [
		AppComponent,
		SudokuComponent,
		GameComponent,
		StartComponent,
		SudokuCellComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

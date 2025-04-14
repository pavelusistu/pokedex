import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-caught',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './caught.component.html',
  styleUrl: './caught.component.scss',
})
export class CaughtComponent implements OnInit {
  caughtPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.caughtPokemons = this.pokemonService.getCaughtPokemons();
    }
  }

  removePokemon(id: number): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.pokemonService.removeCaughtPokemon(id);
      this.caughtPokemons = this.pokemonService.getCaughtPokemons();
    }
  }
}

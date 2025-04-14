import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private caughtPokemonsKey = 'caughtPokemons';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 20) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(nameOrId: string) {
    return this.http.get(`${this.baseUrl}/${nameOrId}`);
  }

  saveCaughtPokemon(pokemon: any): void {
    let caughtPokemons = this.getCaughtPokemons();
    caughtPokemons.push(pokemon);
    localStorage.setItem(
      this.caughtPokemonsKey,
      JSON.stringify(caughtPokemons)
    );
  }

  getCaughtPokemons(): any[] {
    const caughtPokemons = localStorage.getItem(this.caughtPokemonsKey);
    return caughtPokemons ? JSON.parse(caughtPokemons) : [];
  }

  removeCaughtPokemon(id: number): void {
    let caughtPokemons = this.getCaughtPokemons();
    caughtPokemons = caughtPokemons.filter((pokemon: any) => pokemon.id !== id);
    localStorage.setItem(
      this.caughtPokemonsKey,
      JSON.stringify(caughtPokemons)
    );
  }

  isPokemonCaught(id: number): boolean {
    const caughtPokemons = this.getCaughtPokemons();
    return caughtPokemons.some((pokemon: any) => pokemon.id === id);
  }
}

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of Pokémon', () => {
    const mockResponse = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };

    service.getPokemonList().subscribe((data) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0].name).toBe('pikachu');
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch Pokémon details by name or ID', () => {
    const mockDetails = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
    };

    service.getPokemonDetails('pikachu').subscribe((data) => {
      expect(data.name).toBe('pikachu');
      expect(data.id).toBe(25);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  it('should save caught Pokémon to localStorage', () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    spyOn(localStorage, 'setItem'); // Spy on localStorage.setItem

    service.saveCaughtPokemon(mockPokemon);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'caughtPokemons',
      JSON.stringify([mockPokemon])
    );
  });

  it('should retrieve caught Pokémon from localStorage', () => {
    const mockCaughtPokemons = [{ id: 1, name: 'bulbasaur' }];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockCaughtPokemons)
    );

    const caughtPokemons = service.getCaughtPokemons();
    expect(caughtPokemons.length).toBe(1);
    expect(caughtPokemons[0].name).toBe('bulbasaur');
  });

  it('should return an empty array when no caught Pokémon are saved', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simulate no caught Pokémon

    const caughtPokemons = service.getCaughtPokemons();
    expect(caughtPokemons).toEqual([]);
  });

  it('should remove a caught Pokémon from localStorage', () => {
    const mockCaughtPokemons = [{ id: 1, name: 'bulbasaur' }];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockCaughtPokemons)
    );
    spyOn(localStorage, 'setItem'); // Spy on setItem

    service.removeCaughtPokemon(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('caughtPokemons', '[]');
  });

  it('should check if a Pokémon is caught', () => {
    const mockCaughtPokemons = [{ id: 1, name: 'bulbasaur' }];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockCaughtPokemons)
    );

    const isCaught = service.isPokemonCaught(1);
    expect(isCaught).toBe(true);

    const isNotCaught = service.isPokemonCaught(2);
    expect(isNotCaught).toBe(false);
  });
});

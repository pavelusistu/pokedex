import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexComponent } from './pokedex.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Retviews-Pokedex' title`, () => {
    expect(component.title).toEqual('Pokédex');
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment/environment';
import { Character } from '@shared/interface/character.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacter( query: any = '', page = 1): Observable<Character[]> {
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter)
  } 

  getDetaild( id: number ): Observable<Character> {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
  }
}

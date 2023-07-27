import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private apiUrl = environment.apiURL;

  moviesName: string[] = [];
  searchEnabled: boolean = false;
  updatedMovieList: any;

  public updateMessage = new Subject<string>()

  constructor(private http: HttpClient) { }

  updateMessages(message: any) {
    this.updateMessage.next(message);
  }

  movieList = [
    { url: '../../assets/image/movies/movie1.jpg', name: 'KK', location: 'Chennai', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie2.jpg', name: 'Geetha Govindam', location: 'All location', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie3.jpg', name: 'Pyar prema kadhal', location: 'Chennai', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie4.jpg', name: 'KKS', location: 'Chennai', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie5.jpg', name: 'Alpha', location: 'World wide', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie6.jpg', name: 'Vishvaroopam 2', location: 'Chennai', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie7.jpg', name: 'HPJ', location: 'Chennai', date: 'Sep 7-8' },
    { url: '../../assets/image/movies/movie8.jpg', name: 'MI', location: 'Chennai', date: 'Sep 7-8' },
  ]

  getMovieList() {
    return this.updatedMovieList;
  }

  getMovieListName() {
    this.moviesName = [];
    this.movieList.forEach(movielist => {
      this.moviesName.push(movielist.name);
    })
    return this.moviesName;
  }
  updateMovieList(updatedMovie: any) {
    this.updatedMovieList = []
    for (let flag = 0; flag < updatedMovie.length; flag++) {
      this.updatedMovieList.push(this.movieList.filter(x => x.name.toLocaleLowerCase() == updatedMovie[flag].toLocaleLowerCase()));
    }
  }

  addNewMovie(newMovie: any) {
    this.movieList.push(newMovie);
  }
  deleteMovie(index: any) {
    this.movieList.splice(index, 1);
  }

  save(url: string, data: any) {
    return this.http.post(this.apiUrl + url, data);
  }
  updateById(url: string, id: any, data: any) {
    return this.http.put(this.apiUrl + url + '/' + id, data);
  }
  getAll(url: string) {
    return this.http.get(this.apiUrl + url);
  }
  getById(url: string, id: any) {
    return this.http.get(this.apiUrl + url + '/' + id);
  }
}

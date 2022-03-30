/**
 * The FetchApiDataService is used to make Http requests to the movieList Api.
 * @module FetchApiDataService
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movie-list-api-5858.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor (private http: HttpClient) {
  }

  /**
   * Sends a POST request to create a new user.
   * @param userDetails An object that contains the user's username, password, email and birthday.
   * @returns An Observable that represents either a JSON object with the new user's details or the error if the request fails.
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sends a POST request to log in a user.
   * @param userDetails An object containing the user's username and password.
   * @returns An Observable that represents either a JSON object with the user's details and a web token; or the error if the request fails.
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to get all movies.
   * @returns An Observable that represents either an array of all movies or the error if the request fails.
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError));
  }

   /**
   * Takes a request response and returns either the response body or an empty object.
   * @param res The response to an Http request.
   * @returns Either the response or an empty object.
   */

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  /**
   * Sends a GET request to get information on a single movie.
   * @returns An Observable that represents either a JSON object of a movie and its details or the error if the request fails.
   */

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to get Director information.
   * @returns An Observable that represents either a JSON object of director information or the error if the request fails.
   */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:Director', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to get Genre information.
   * @returns An Observable that represents either a JSON object of genre information or the error if the request fails.
   */

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/:Genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

   /**
   * Sends a GET request to fetch details for the specified user.
   * @returns An Observable that represents either a JSON object with the user's data or the error if the request fails.
   */

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to get all of the users favorites
   * @param username Username of the logged in user.
   * @returns An Observable that represents either a JSON object with user favorites or the error if the request fails.
   */

  getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a PUT request to add a movie to the user's favorites.
   * @param MovieID ID of the movie to be added to the user's favorites list.
   * @returns An Observable that represents either a JSON object with an updated favorites list or the error if the request fails.
   */

  addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/favorites/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

   /**
   * Sends a PUT request to delete a movie from the user's favorites.
   * @param MovieID ID of the movie to be removed from the user's favorites list.
   * @returns An Observable that represents either a JSON object with an updated favorites list or the error if the request fails.
   */

  deleteFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/favorites/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a PUT request to update the user's details.
   * @param userCredentials An object containing the user's updated username, password, email and birthday.
   * @returns An Observable that represents either a JSON object with the user's updated data or the error if the request fails.
   */

  editProfile(userCredentials: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userCredentials, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a DELETE request to delete the user.
   * @returns An Observable that represents either a text confirmation that the user has been deregistered or the error if the request fails.
   */

  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles error responses to Http requests.
   * @param error The HttpErrorReponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */

  private handleError (error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status},` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'something bad happened, please try again later.');
  }
}

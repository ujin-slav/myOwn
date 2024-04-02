import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import * as PostsActions from './actions';

@Injectable()
export class PostsEffects {

    constructor(private actions$: Actions, private httpService: HttpService) {}

  getPosts$ = createEffect(():any =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.httpService.getData().pipe(
          map((posts) => PostsActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
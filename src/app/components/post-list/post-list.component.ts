import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Observable } from 'rxjs';

export interface IPostCreate {
  userId: number,
  id:number;
  title:string;
  body:string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),
      transition(':leave',
        animate(400, style({opacity: 0})))
    ])
  ]
})
export class PostListComponent {
  
  @Input() posts:IPost[] = []
  @Output() newPost = new EventEmitter<IPostCreate>();
  @Output() dellPost = new EventEmitter<number>();
  
  newPostText:string = ""
  newPostTitle:string = ""

  addPost(){
    this.newPost.emit({
      "userId": 1,
      "id": this.posts.length+1,
      "title": this.newPostTitle,
      "body":this.newPostText
    });
  }
  
  deletePost(postNumber:number){
    this.dellPost.emit(postNumber);
  }
}

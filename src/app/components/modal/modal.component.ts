import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/Store/selectors';
import { select, Store } from '@ngrx/store';
import {
  errorSelector,
  isLoadingSelector,
  postsSelector,
} from '../../Store/selectors';
import * as PostsActions from '../../Store/actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        opacity: 0.1,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class ModalComponent implements OnInit {
  testAnimation = false
  isOpen = false;
  private element: any;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<IPost[]>;

  posts:IPost[]=[]
  searchString:string = ""
  isLoading:boolean=false
  
  constructor( 
              private el: ElementRef,
              private httpService: HttpService,
              private modalService: ModalService,
              private store: Store<AppStateInterface>) { 
              this.element = el.nativeElement;
              this.isLoading$ = this.store.pipe(select(isLoadingSelector));
              this.error$ = this.store.pipe(select(errorSelector));
              this.posts$ = this.store.pipe(select(postsSelector));
  }


  ngOnInit(): void {
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
        if (el.target.className === 'jw-modal') {
          this.onShow();
        }
    })
    this.httpService.getData()
          .subscribe({
            next: (data: IPost[]) => {
              this.isLoading=true
              setTimeout(()=>{
                this.posts=data  
                this.isLoading=false      
              },3000)
            }
    });
    //this.store.dispatch(PostsActions.getPosts());
  }

  ngOnDestroy(): void {
    this.element.remove();
    this.posts=[]

  }
  onChangeSearchInput(value: string) {
    let newPosts:IPost[] = this.posts
    
    this.posts = this.posts.filter(post => post.body.toLowerCase().includes(value.toLowerCase()))
  }

  onShow(){
    this.isOpen=!this.isOpen
  }

  toggle() {
    this.testAnimation = !this.testAnimation;
  }

}

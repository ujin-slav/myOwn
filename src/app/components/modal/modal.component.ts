import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isOpen = false;
  private element: any;

  posts:IPost[]=[]
  searchString:string = ""
  isLoading:boolean=false
  
  constructor( 
              private el: ElementRef,
              private httpService: HttpService,
              private modalService: ModalService) { 
              this.element = el.nativeElement;
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

}

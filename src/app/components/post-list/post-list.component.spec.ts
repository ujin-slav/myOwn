import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material-module';
import { EffectsModule } from '@ngrx/effects';
import { first } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IPost } from 'src/app/models/IPost';
import { By } from '@angular/platform-browser';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,MaterialModule, 
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
      ],
      declarations: [ PostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise an event when the delete post is clicked', () => {
    const posts: IPost[] = [{ id: 1, body: 'body 1', title: 'dsdsd', userId:1 }];
    component.posts = posts;
    component.dellPost.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(posts[1].id);
    });

    let debugElement = fixture.debugElement;
    let button = debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});
  });
});


import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { ModalComponent } from './modal.component';
import { PostListComponent } from '../post-list/post-list.component';
import { IPost } from 'src/app/models/IPost';
import { from, Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from 'src/app/services/http.service';


describe('ModalComponent', () => {
  let posts: IPost[];
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockHttpService: any;

  beforeEach(async () => {

    posts = [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      },
      {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
      }
    ]
    mockHttpService = jasmine.createSpyObj(['getData']);

    await TestBed.configureTestingModule({
      declarations: [ ModalComponent, PostListComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create exact same number of Post Component',() => {
    component.isOpen = true
    mockHttpService.getData.and.returnValue(of(posts));
    component.posts = posts
    fixture.detectChanges()
    const postComponentDEs = fixture.debugElement.queryAll(By.css('.card'))
    expect(postComponentDEs.length).toEqual(posts.length);
  });
});

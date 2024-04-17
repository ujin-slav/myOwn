import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { IPost } from '../models/IPost';

describe('HttpService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpService;
  let posts:IPost[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [
        HttpClientTestingModule
      ],
      providers: [HttpService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts()', () => {
    it('should return posts when getPosts() is called', (done: DoneFn) => {
      service.getData().subscribe((data) => {
        expect(data).toEqual(posts);
        done();
      });

      const request = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/comments?postId=10'
      );
      request.flush(posts);
      expect(request.request.method).toBe('GET');
    });
  });

});

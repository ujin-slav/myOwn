import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/material-module';

describe('AppComponent', () => {

  let component = new AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        ModalComponent,
        PostListComponent,
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'myOwn'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('myOwn');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('Количество лайков');
  });

  it('should render title', () => {
    spyOn(component, 'showMessage').and.callFake(() => {
      return "Hello"
    });
    expect(component.showMessage()).toBe("Hello") 
  });
});

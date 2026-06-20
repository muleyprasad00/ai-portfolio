import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the footer component', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

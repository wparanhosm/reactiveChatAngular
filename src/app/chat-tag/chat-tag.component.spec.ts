import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTagComponent } from './chat-tag.component';

describe('ChatTagComponent', () => {
  let component: ChatTagComponent;
  let fixture: ComponentFixture<ChatTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

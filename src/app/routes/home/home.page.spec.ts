import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from '../../shared/ui/list.component';
import { LoadingComponent } from '../../shared/ui/loading.component';
import { ActivityItemComponent } from './activity-item.component';
import { HomePage } from './home.page';

describe('The Home Page', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        LoadingComponent,
        ListComponent,
        ActivityItemComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

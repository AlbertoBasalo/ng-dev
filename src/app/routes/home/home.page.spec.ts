import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from '../../shared/ui/list.component';
import { LoadingComponent } from '../../shared/ui/loading.component';
import { ActivityItemComponent } from './activity-item.component';
import { HomeFacade } from './home.facade';
import { HomePage } from './home.page';

describe('The Home Page', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let homeFacadeSpy: jest.SpyInstance;
  const homeFacadeInitialStub = {
    getActivities: jest.fn(),
    getActivitiesStore: {
      isWorking: () => true,
      isCompleted: () => false,
      result: () => [],
    },
  };
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
    TestBed.overrideProvider(HomeFacade, {
      useValue: homeFacadeInitialStub,
    });
    homeFacadeSpy = jest.spyOn(homeFacadeInitialStub, 'getActivities');
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.getActivities();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show loading when is working', () => {
    const loading = fixture.nativeElement.querySelector('lab-loading');
    expect(loading).toBeTruthy();
  });
  it('should call getActivities on HomeFacade', () => {
    component.getActivities();
    expect(homeFacadeSpy).toHaveBeenCalled();
  });
});

describe('The Home Page when data is loaded', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const homeFacadeCompletedStub = {
    getActivities: jest.fn(),
    getActivitiesStore: {
      isWorking: () => false,
      isCompleted: () => true,
      result: () => [{ id: 1, title: 'test' }],
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        LoadingComponent,
        ListComponent,
        ActivityItemComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    TestBed.overrideProvider(HomeFacade, {
      useValue: homeFacadeCompletedStub,
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should show list when is completed', () => {
    const list = fixture.debugElement.query(By.css('lab-list'));
    expect(list).toBeTruthy();
  });
  // should have activity-item as item template
  it('should have activity-item as item template', () => {
    const activityItem = fixture.debugElement.query(
      By.css('lab-activity-item')
    );
    expect(activityItem).toBeTruthy();
  });
});

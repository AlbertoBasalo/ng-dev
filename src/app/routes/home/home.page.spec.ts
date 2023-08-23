import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from '../../shared/ui/list.component';
import { LoadingComponent } from '../../shared/ui/loading.component';
import { ActivityItemComponent } from './activity-item.component';
import { HomeFacade } from './home.facade';
import { HomePage } from './home.page';

describe('The Home Page component', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let dbgEl: DebugElement;
  let htmEl: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        LoadingComponent,
        ListComponent,
        ActivityItemComponent,
        RouterTestingModule,
      ],
    }).compileComponents();
  });
  describe('when is initialized', () => {
    const homeFacadeInitialStub = {
      getActivities: jest.fn(),
      getActivitiesStore: {
        isWorking: () => true,
        isCompleted: () => false,
        result: () => [],
      },
    };
    beforeEach(() => {
      TestBed.overrideProvider(HomeFacade, {
        useValue: homeFacadeInitialStub,
      });
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      htmEl = fixture.nativeElement;
      fixture.detectChanges();
    });
    it('should create and instance', () => {
      expect(component).toBeTruthy();
    });
    it('should call getActivities on HomeFacade', () => {
      let homeFacadeSpy: jest.SpyInstance = jest.spyOn(
        homeFacadeInitialStub,
        'getActivities'
      );
      expect(homeFacadeSpy).toHaveBeenCalled();
    });
    it('should display the loading component', () => {
      const loading = htmEl.querySelector('lab-loading');
      expect(loading).toBeTruthy();
    });
  });

  describe('when data is loaded', () => {
    const homeFacadeCompletedStub = {
      getActivities: jest.fn(),
      getActivitiesStore: {
        isWorking: () => false,
        isCompleted: () => true,
        result: () => [
          {
            slug: 'test',
            title: 'test',
            price: 0,
            currency: 'EUR',
            date: new Date(),
          },
        ],
      },
    };
    beforeEach(async () => {
      TestBed.overrideProvider(HomeFacade, {
        useValue: homeFacadeCompletedStub,
      });
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      dbgEl = fixture.debugElement;
      htmEl = fixture.nativeElement;
      fixture.detectChanges();
    });
    it('should display the list component', () => {
      const list = dbgEl.query(By.css('lab-list'));
      expect(list).toBeTruthy();
    });
    it('should use activity-item as the template', () => {
      const activityItem = dbgEl.query(By.css('lab-activity-item'));
      expect(activityItem).toBeTruthy();
    });
    it('should display the activity title (using debug)', () => {
      const list = dbgEl.query(By.css('lab-list'));
      const caption = list?.nativeElement.textContent;
      expect(caption).toContain('Published activities');
    });
    it('should display the activity title (using native)', () => {
      const list = htmEl.querySelector('lab-list');
      const caption = list?.getAttribute('caption');
      expect(caption).toContain('Published activities');
    });
  });
});

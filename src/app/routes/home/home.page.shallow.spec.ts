import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeFacade } from './home.facade';
import { HomePage } from './home.page';

const homeFacadeInitialStub = {
  getActivities: jest.fn(),
  getActivitiesStore: {
    isWorking: () => true,
    isCompleted: () => false,
    result: () => [],
  },
};
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

describe('The Home Page component NO ERRORS SCHEMA', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let dbgEl: DebugElement;
  let htmEl: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
  describe('when is initialized', () => {
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

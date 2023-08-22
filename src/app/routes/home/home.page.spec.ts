import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
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
  let dbEl: DebugElement;
  let ntEl: HTMLElement;
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
  });
  describe('When data is loading', () => {
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
      ntEl = fixture.nativeElement;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should show loading when is working', () => {
      const loading = ntEl.querySelector('lab-loading');
      expect(loading).toBeTruthy();
    });
    it('should call getActivities on HomeFacade', () => {
      let homeFacadeSpy: jest.SpyInstance = jest.spyOn(
        homeFacadeInitialStub,
        'getActivities'
      );
      expect(homeFacadeSpy).toHaveBeenCalled();
    });
  });

  describe('When data is complete loaded', () => {
    const homeFacadeCompletedStub = {
      getActivities: jest.fn(),
      getActivitiesStore: {
        isWorking: () => false,
        isCompleted: () => true,
        result: () => [{ id: 1, title: 'test' }],
      },
    };
    beforeEach(async () => {
      TestBed.overrideProvider(HomeFacade, {
        useValue: homeFacadeCompletedStub,
      });
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      dbEl = fixture.debugElement;
      fixture.detectChanges();
    });
    it('should show list when is completed', () => {
      const list = dbEl.query(By.css('lab-list'));
      expect(list).toBeTruthy();
    });
    it('should have activity-item as item template', () => {
      const activityItem = dbEl.query(By.css('lab-activity-item'));
      expect(activityItem).toBeTruthy();
    });
  });
});

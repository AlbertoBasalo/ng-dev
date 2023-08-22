import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivitiesService } from '../../shared/data/activities.service';
import { GlobalState } from '../../shared/state/global.state';
import { MyActivitiesFacade } from './my-activities.facade';

describe('MyActivitiesFacade', () => {
  let myActivitiesFacadeSUT: MyActivitiesFacade;
  const globalStateStub = {
    userId: () => '1',
  };
  const activitiesServiceStub = {
    getByUserId: jest.fn(),
    putActivity: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyActivitiesFacade,
        {
          provide: ActivitiesService,
          useValue: activitiesServiceStub,
        },
        {
          provide: GlobalState,
          useValue: globalStateStub,
        },
      ],
    });
    myActivitiesFacadeSUT = TestBed.inject(MyActivitiesFacade);
  });

  it('should be instantiable', () => {
    expect(myActivitiesFacadeSUT).toBeTruthy();
  });

  it('should call the service to get the activities', () => {
    // Arrange
    activitiesServiceStub.getByUserId.mockReturnValue(of([]));
    const getByUserIdSpy = jest.spyOn(activitiesServiceStub, 'getByUserId');
    // Act
    myActivitiesFacadeSUT.getMyActivities();
    // Assert
    expect(getByUserIdSpy).toHaveBeenCalled();
  });

  it('should call the state to execute the command', () => {
    // Arrange
    activitiesServiceStub.getByUserId.mockReturnValue(of([]));
    const executeSpy = jest.spyOn(
      myActivitiesFacadeSUT.getMyActivitiesState,
      'execute'
    );
    // Act
    myActivitiesFacadeSUT.getMyActivities();
    // Assert
    expect(executeSpy).toHaveBeenCalled();
  });
});

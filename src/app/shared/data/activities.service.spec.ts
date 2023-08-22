import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let activitiesService: ActivitiesService;
  let httpTestingController: HttpTestingController;
  const MOCK_RESULT: any[] = [
    { id: 1, name: 'Activity 1' },
    { id: 2, name: 'Activity 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivitiesService],
    });

    activitiesService = TestBed.inject(ActivitiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be instantiable', () => {
    expect(activitiesService).toBeTruthy();
  });

  it('should get the activities from the expected endpoint', () => {
    // Act
    activitiesService.getActivities().subscribe((activities) => {
      expect(activities.length).toBe(2);
    });
    // Assert
    const expectedUrl = 'http://localhost:3000/activities';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    // Arrange
    req.flush(MOCK_RESULT);
  });

  it('should call the api filtering by userId', () => {
    // Act
    activitiesService.getByUserId('1').subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/activities?userId=1';
    const req = httpTestingController.expectOne(expectedUrl);
    // Arrange
    req.flush(MOCK_RESULT);
  });
});

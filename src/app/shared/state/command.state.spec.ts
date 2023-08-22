import { CommandState } from './command.state';

describe('The CommandState class', () => {
  const INPUT_RESULT = { data: 'input' };
  const INPUT_NULL = { data: '' };
  const INPUT_ERROR = { message: 'error' };
  let commandStateSUT: CommandState<{ data: string }>;
  beforeEach(() => {
    // Arrange
    commandStateSUT = new CommandState(INPUT_NULL);
  });
  it('should create be instantiable', () => {
    expect(commandStateSUT) // Act
      .toBeTruthy(); // Assert
  });
  it('should set correct states when setStarted is called', () => {
    // Act
    commandStateSUT.setStarted();
    // Assert
    expect(commandStateSUT.isWorking()).toBe(true);
    expect(commandStateSUT.result()).toBe(INPUT_NULL);
    expect(commandStateSUT.error()).toBeNull();
  });
  it('should set correct states when setSucceed is called', () => {
    // Act
    commandStateSUT.setSucceed(INPUT_RESULT);
    // Assert
    expect(commandStateSUT.isWorking()).toBe(false);
    expect(commandStateSUT.result()).toBe(INPUT_RESULT);
    expect(commandStateSUT.error()).toBeNull();
  });
  it('should set correct states when setFailed is called', () => {
    // Act
    commandStateSUT.setFailed(INPUT_ERROR);
    // Assert
    expect(commandStateSUT.isWorking()).toBe(false);
    expect(commandStateSUT.result()).toBe(INPUT_NULL);
    expect(commandStateSUT.error()).toBe(INPUT_ERROR);
  });
});

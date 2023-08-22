import { CommandStore } from './command.store';

describe('The CommandStore class', () => {
  const INPUT_RESULT = { data: 'input' };
  const INPUT_NULL = { data: '' };
  const INPUT_ERROR = { message: 'error' };
  let commandStoreSUT: CommandStore<{ data: string }>;
  beforeEach(() => {
    // Arrange
    commandStoreSUT = new CommandStore(INPUT_NULL);
  });
  it('should create be instantiable', () => {
    expect(commandStoreSUT) // Act
      .toBeTruthy(); // Assert
  });
  it('should set correct states when setStarted is called', () => {
    // Act
    commandStoreSUT.setStarted();
    // Assert
    expect(commandStoreSUT.isWorking()).toBe(true);
    expect(commandStoreSUT.result()).toBe(INPUT_NULL);
    expect(commandStoreSUT.error()).toBeNull();
  });
  it('should set correct states when setSucceed is called', () => {
    // Act
    commandStoreSUT.setSucceed(INPUT_RESULT);
    // Assert
    expect(commandStoreSUT.isWorking()).toBe(false);
    expect(commandStoreSUT.result()).toBe(INPUT_RESULT);
    expect(commandStoreSUT.error()).toBeNull();
  });
  it('should set correct states when setFailed is called', () => {
    // Act
    commandStoreSUT.setFailed(INPUT_ERROR);
    // Assert
    expect(commandStoreSUT.isWorking()).toBe(false);
    expect(commandStoreSUT.result()).toBe(INPUT_NULL);
    expect(commandStoreSUT.error()).toBe(INPUT_ERROR);
  });
});

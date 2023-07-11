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
});

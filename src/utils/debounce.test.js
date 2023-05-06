import { debounce } from './debounce';

describe('debounce util', () => {
  jest.useFakeTimers();

  it('Should call the callback function after the specified time delay', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 500);

    debouncedFunction();

    // Fast-forward time
    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should debounce multiple calls and only execute the callback once', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 500);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // Fast-forward time to the maximum delay
    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should execute the callback with the latest arguments', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback);

    debouncedFunction('first');
    debouncedFunction('second');

    // Fast-forward time to the maximum delay
    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });
});

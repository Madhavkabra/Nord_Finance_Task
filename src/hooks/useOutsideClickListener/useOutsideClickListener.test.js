import { renderHook } from '@testing-library/react';
import { useOutsideClickListener } from '.';

describe('useOutsideClickListener hook', () => {
  it('Should call onClickOutside when clicking outside the ref element', () => {
    const onClickOutside = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useOutsideClickListener({ ref, onClickOutside }));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    // Trigger a mousedown event outside the ref element
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    outsideElement.dispatchEvent(mousedownEvent);

    expect(onClickOutside).toHaveBeenCalledTimes(1);

    document.body.removeChild(outsideElement);
  });

  it('Should not call onClickOutside when clicking inside the ref element', () => {
    const onClickOutside = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useOutsideClickListener({ ref, onClickOutside }));

    // Trigger a mousedown event inside the ref element
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    ref.current.dispatchEvent(mousedownEvent);

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});

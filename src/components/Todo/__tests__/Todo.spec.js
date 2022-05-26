import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
// import fetch from 'cross-fetch';
import Component from '../Todo';

// jest.mock('cross-fetch');

describe('Todo', () => {
  let wrapper = null;
  // jest.useFakeTimers();
  // jest.advanceTimersByTime(1000);
  const fakeItems = [{
    id: 2, title: 'React', completed: false,
  }];

  beforeEach(() => {
    // const mountedSpy = jest.spyOn(Component, 'mounted');
    wrapper = shallowMount(Component, {
      mocks: { fetch },
    });
    // expect(mountedSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('test data', () => {
    it('should has correct loading status.', async () => {
      // 如果正在載入，應該顯示相關訊息
      await wrapper.setData({ isLoading: true, isError: false });
      expect(wrapper.text()).toContain('isLoading...');

      // 如果載入後得到錯誤，應該顯示錯誤訊息
      await wrapper.setData({ isLoading: false, isError: true });
      expect(wrapper.text()).toContain('An unexpected error has occurred.');

      // 不太可能同時 isLoading & isError，但若真的發生，應該只顯示錯誤訊息
      await wrapper.setData({ isLoading: true, isError: true });
      expect(wrapper.text()).toContain('An unexpected error has occurred.');
    });
  });

  describe('test methods: ajaxServerItemsLoad', () => {
    it('should return success info.', async () => {
      // fetch = jest.fn(() => Promise.resolve(fakeItems));
      fetch.mockReturnValue(() => Promise.resolve(fakeItems));

      wrapper.vm.ajaxServerItemsLoad();
      await flushPromises();
      expect(wrapper.vm.items).toEqual([{
        id: fakeItems[0].id,
        title: fakeItems[0].title,
        completed: fakeItems[0].completed,
        isEditing: false,
      }]);

      // const { id, title } = fakeItem;
      // const payload = { id, title };
      // expect(wrapper.vm.ajaxServerItemsLoad(payload)).toEqual(payload);
    });
  });
});

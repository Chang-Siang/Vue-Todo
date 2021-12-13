import { shallowMount } from '@vue/test-utils';
import Component from '../TodoItemSort';

describe('TodoItemSort', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        sortType: 'asc',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('test props', () => {
    it('should has correct text.', async () => {
      const propsSortType = 'desc';
      await wrapper.setProps({
        sortType: propsSortType,
      });
      // console.log('wrapper.find(button).text() :>> ', wrapper.find('button').text());
      expect(wrapper.find('button').text()).toContain(propsSortType);
    });
  });

  describe('test methods: onItemAdd', () => {
    it('should has correct sort type. (when previous sort type not equal `time`)', async () => {
      await wrapper.setProps({ sortType: 'desc' });
      wrapper.vm.onItemSort();
      expect(wrapper.emitted().handleItemSort[0]).toEqual(['time']);
    });
    it('should has correct sort type. (when previous sort type equal `time`)', async () => {
      await wrapper.setProps({ sortType: 'time' });
      wrapper.vm.onItemSort();
      expect(wrapper.emitted().handleItemSort[0]).toEqual(['asc']);
    });
  });
});

// https://stackoverflow.com/questions/53660288/how-to-unit-test-a-method-in-a-vue-js-component-using-jest/53660935
// https://medium.com/swlh/tips-on-unit-testing-vue-components-with-jest-e68ff6a28bb5
import { shallowMount } from '@vue/test-utils';
import Component from '../TodoItem';

describe('TodoItem', () => {
  let wrapper = null;
  const fakeItem = {
    id: 2, title: 'React', completed: false, isEditing: false,
  };

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: fakeItem,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  // Check initial state
  // 測試 props 是否會如預期更新
  describe('test props', () => {
    it('should has correct text and class.', async () => {
      // before: original status
      expect(wrapper.find('.text-truncate > span').text()).toBe(fakeItem.title);
      expect(wrapper.find('.text-truncate').classes()).not.toContain('completed');

      // after
      const propsTitle = 'Vue Unit Testing';
      const propsCompleted = true;

      await wrapper.setProps({
        title: propsTitle,
        completed: propsCompleted,
      });
      expect(wrapper.find('.text-truncate > span').text()).toBe(propsTitle);
      expect(wrapper.find('.text-truncate').classes()).toContain('completed');
    });
  });

  // 測試 methods 是否會如預期動作 or 回傳
  describe('test methods: onItemComplete', () => {
    it('should send correct data.', async () => {
      wrapper.vm.onItemComplete();
      expect(wrapper.emitted().handleItemUpdate[0]).toEqual([{
        id: fakeItem.id,
        title: fakeItem.title,
        completed: !fakeItem.completed,
        isEditing: fakeItem.isEditing,
      }]);
    });
  });

  describe('test methods: onItemEdit', () => {
    it('should send correct data.', async () => {
      wrapper.vm.onItemEdit();
      expect(wrapper.emitted().handleItemEdit[0]).toEqual([fakeItem]);
    });
  });

  describe('test methods: onItemDel', () => {
    it('should send correct data.', async () => {
      wrapper.vm.onItemDel();
      expect(wrapper.emitted().handleItemDel[0]).toEqual([fakeItem]);
    });
  });

  // 測試 computed 是否會如預期更新
  describe('test computed: item', () => {
    it('should has correct data.', async () => {
      const propsTitle = 'Vue Unit Testing';
      await wrapper.setProps({
        title: propsTitle,
      });
      expect(wrapper.vm.item).toEqual({
        id: fakeItem.id,
        title: propsTitle,
        completed: fakeItem.completed,
        isEditing: fakeItem.isEditing,
      });
    });
  });
});

// https://stackoverflow.com/questions/53660288/how-to-unit-test-a-method-in-a-vue-js-component-using-jest/53660935
// https://medium.com/swlh/tips-on-unit-testing-vue-components-with-jest-e68ff6a28bb5
import { shallowMount } from '@vue/test-utils';
import Component from '../TodoEditForm';

describe('TodoEditForm', () => {
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

  // 測試 props & data 是否會如預期更新
  describe('test props', () => {
    it('should has correct text and class.', async () => {
      expect(wrapper.find('input').element.value).toBe(fakeItem.title);
    });
  });

  describe('test data', () => {
    it('should has correct text & status.', async () => {
      const dataNewInput = 'React';
      await wrapper.find('input').setValue(dataNewInput);
      expect(wrapper.vm.newInput).toBe(dataNewInput);
      expect(wrapper.vm.item.title).toBe(dataNewInput);
    });
  });

  // 測試 methods 是否會如預期動作 or 回傳
  describe('test methods: onItemUpdate', () => {
    it('should send correct data.', async () => {
      wrapper.vm.onItemUpdate();
      expect(wrapper.emitted().handleItemUpdate[0]).toEqual([{
        id: fakeItem.id,
        title: fakeItem.title,
        completed: fakeItem.completed,
        isEditing: false,
      }]);
    });
    it('should not send any data. (when user clear the input)', async () => {
      const dataNewInput = ' ';
      await wrapper.find('input').setValue(dataNewInput);
      wrapper.vm.onItemUpdate();
      expect(wrapper.emitted().handleItemUpdate).toBeUndefined();
    });
  });

  // 測試 computed 是否會如預期更新
  describe('test computed: item', () => {
    it('should has correct data.(default)', async () => {
      expect(wrapper.vm.item).toEqual(fakeItem);
    });
    it('should has correct data.(edited title)', async () => {
      const dataNewInput = 'React';
      await wrapper.setData({ newInput: dataNewInput });
      expect(wrapper.vm.item).toEqual({
        id: fakeItem.id,
        title: dataNewInput,
        completed: fakeItem.completed,
        isEditing: fakeItem.isEditing,
      });
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import Component from '../TodoInputForm';

describe('TodoInputForm', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('test data', () => {
    it('should has correct text.', async () => {
      // 情境 1: data to element
      const dataNewInputA = 'Vue';
      await wrapper.setData({ newInput: dataNewInputA });
      expect(wrapper.find('input').element.value).toBe(dataNewInputA);
    });
    it('should has correct text.', async () => {
      // 情境 2: element to data
      const dataNewInputB = 'React';
      await wrapper.find('input').setValue(dataNewInputB);
      expect(wrapper.vm.newInput).toBe(dataNewInputB);
    });
  });

  describe('test methods: onItemAdd', () => {
    let spy = null;

    const setMethodGetDateNow = () => {
      const now = Date.now();
      spy = jest.spyOn(wrapper.vm, 'getDateNow').mockImplementation(() => now);
      return now;
    };

    const setDataNewInput = (value) => {
      wrapper.setData({ newInput: value });
      // 模擬手動輸入 (是否在整合測試才用這種手法？)
      // await wrapper.find('.input').setValue(dataNewInput);
      return value;
    };

    beforeEach(() => {
      spy = jest.fn();
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('should send correct data.', async () => {
      const now = setMethodGetDateNow();
      const dataNewInput = await setDataNewInput('Vue');
      wrapper.vm.onItemAdd();
      console.log('spy :>> ', spy.mock);
      expect(wrapper.emitted().handleItemAdd[0]).toEqual([{
        id: now,
        title: dataNewInput,
        isCompleted: false,
        isEditing: false,
      }]);
    });

    it('should clear input after event emitted.', async () => {
      await setDataNewInput('Vue');
      wrapper.vm.onItemAdd();
      expect(wrapper.vm.newInput).toBe('');
    });
  });
});

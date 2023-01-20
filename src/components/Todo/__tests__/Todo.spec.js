import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Component from '../Todo';

/* mock global */
global.fetch = jest.fn(() => Promise.resolve({}));

describe('Todo', () => {
  /* let */
  let wrapper = null;
  /* vue lifecycle */
  let createdSpy;
  let mountedSpy;
  let beforeDestroySpy;
  let initializeSpy;

  const fakeItems = [{
    id: 2, title: 'Vue2', completed: false,
  }];

  beforeEach(() => {
    /* spy lifecycle */
    createdSpy = jest.spyOn(Component, 'created');
    mountedSpy = jest.spyOn(Component, 'mounted');
    beforeDestroySpy = jest.spyOn(Component, 'beforeDestroy');
    initializeSpy = jest.spyOn(Component.methods, 'ajaxServerItemsLoad').mockImplementationOnce(() => true);

    /* mount component */
    wrapper = shallowMount(Component, {
      /* props injection */
      propsData: {},
      /* mocks injection */
      mocks: {},
      /* child component injection: shallowMount dont use this option */
      stubs: {},
      /* method injection */
      methods: {},
      /* vuex injection */
      // store,
      // localVue,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    wrapper.destroy();
  });

  /* 測試生命週期是否順利執行(若執行過程中遇到錯誤使元件渲染失敗, 就不會通過測試) */
  describe('test lifecycle', () => {
    it('is a Vue instance.', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should run created & mounted.', () => {
      expect(createdSpy).toHaveBeenCalled();
      expect(mountedSpy).toHaveBeenCalled();
    });

    /* 呼叫 initialize 進行開始載入資料 */
    it('mounted: should call `ajaxServerItemsLoad`.', () => {
      expect(initializeSpy).toHaveBeenCalled();
    });

    it('should run beforeDestroy.', () => {
      wrapper.destroy();
      expect(beforeDestroySpy).toHaveBeenCalled();
    });

    it('should match snapshot.', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('test data', () => {
    describe('isLoading & isError', () => {
      describe.each`
      isLoading | isError  | expectedToContain                      
      ${true}   | ${false} | ${'isLoading...'}                       
      ${false}  | ${true}  | ${'An unexpected error has occurred.'}           
      ${true}   | ${true}  | ${'An unexpected error has occurred.'}           
      `('isLoading = "$isLoading", isError = "$isError", msg = "$expectedToContain".', ({
        isLoading, isError, expectedToContain,
      }) => {
        it('should have correct loading text.', async () => {
          await wrapper.setData({ isLoading, isError });
          expect(wrapper.text()).toContain(expectedToContain);
        });
      });
    });
  });

  describe('test methods', () => {
    describe('ajaxServerItemsLoad', () => {
      /* need to set test case as async function when using flushPromises */
      it('should return success info.', async () => {
        /* set API return value */
        global.fetch.mockImplementationOnce(() => Promise.resolve({
          ok: true,
          status: 200,
          json: () => fakeItems,
        }));
        wrapper.vm.ajaxServerItemsLoad();

        /* wait for API response */
        await flushPromises();

        /* expect */
        expect(wrapper.vm.items).toEqual([{
          id: fakeItems[0].id,
          title: fakeItems[0].title,
          completed: fakeItems[0].completed,
          isEditing: false,
        }]);
      });
    });
  });
});

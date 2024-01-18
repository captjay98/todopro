import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock
  } from 'vue-router-mock'
  import { config } from '@vue/test-utils'
  import { beforeEach, afterEach, vi } from 'vitest';


const router = createRouterMock({spy: {
    create: fn => vi.fn(fn),
    reset: spy => spy.mockReset(),
    },})

  beforeEach(() => {
    injectRouterMock(router);
  });

  afterEach(() => {
    router.reset();
  });

  config.plugins.VueWrapper.install(VueRouterMock)

  export { router }

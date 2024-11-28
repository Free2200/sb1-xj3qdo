import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.mikrotikmobileapp',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  cssParser: 'rework'
} as NativeScriptConfig;
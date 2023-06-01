<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-29 21:49:46
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 13:39:16
 * @FilePath: /v3ts-lockin/src/components/Drawer/src/BasicDrawer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import type { DrawerProps, DrawerInstance } from './typing';

  import { useDesign } from '@/hooks/web/useDesgin';
  import { Drawer } from 'ant-design-vue';
  import { computed, getCurrentInstance, ref, toRaw, unref, useAttrs, watch } from 'vue';
  import { deepMerge } from '@/utils';

  import { basicProps } from './props';
  import { isObject } from '@/utils/is';
  import DrawerHeader from './cpns/DrawerHeader.vue';

  defineOptions({ name: 'BasicDrawer' });
  const props = defineProps(basicProps);
  const attrs = useAttrs();
  const emit = defineEmits<{
    close: [evt: Recordable];
    register: [drawerInstance: DrawerInstance, uid: number];
  }>();

  const visibleRef = ref(false);
  const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

  const { prefixCls } = useDesign('basic-drawer');

  const drawerInstance: DrawerInstance = {
    setDrawerProps: setDrawerProps,
    emitVisible: undefined,
  };

  const instance = getCurrentInstance();

  instance && emit('register', drawerInstance, instance.uid);

  function setDrawerProps(props: DrawerProps | boolean) {
    if (isObject(props)) {
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
      if (Reflect.has(props, 'visible')) {
        visibleRef.value = !!props.visible;
      }
    } else {
      visibleRef.value = props;
    }
  }

  defineExpose({ setDrawerProps });

  watch(
    () => props.visible,
    (newVal, oldVal) => {
      if (newVal !== oldVal) visibleRef.value = newVal;
      console.log(visibleRef.value);
    },
    {
      deep: true,
    },
  );

  const getMergeProps = computed(() => {
    return deepMerge(toRaw(props), unref(propsRef));
  });

  const getProps = computed(() => {
    const opt = {
      placement: 'right',
      ...unref(attrs),
      ...unref(getMergeProps),
      visible: unref(visibleRef),
    };
    opt.title = undefined;
    return opt as DrawerProps;
  });

  const getBindVals = computed(() => {
    return {
      ...attrs,
      ...unref(getProps),
    };
  });

  const onClose = async (e: Recordable) => {
    emit('close', e);
    visibleRef.value = false;
  };
</script>

<template>
  <Drawer :class="prefixCls" @close="onClose" v-bind="getBindVals">
    <!-- title start -->
    <template #title v-if="!$slots.title">
      <DrawerHeader :title="getMergeProps.title" >
      </DrawerHeader>
    </template>
    <template>
      <slot name="title"></slot>
    </template>
    <!-- title end -->
    
  </Drawer>
</template>

<style scoped lang="less"></style>

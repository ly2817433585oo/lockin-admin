<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 15:02:52
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-01 17:20:30
 * @FilePath: /v3ts-lockin/src/views/sys/login/LoginForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Col, Row, Checkbox, Button } from 'ant-design-vue';
  import { computed, reactive, unref, ref } from 'vue';
  import { LoginStateEnum, useLoginState, userFormValid, useFormRules } from './useLogin';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { prefixCls } from '@/settings/designSetting';

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const { getLoginState, setLoginState } = useLoginState();
  const userStore = useUserStore();
  const { getFormRules } = useFormRules();

  const { createErrorModal, notification } = useMessage();
  const formData = reactive({
    account: 'lockin',
    password: '123456',
  });
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  const { validForm } = userFormValid(formRef);

  async function handleLogin() {
    const data = await validForm();
    if (!data) {
      return;
    }
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        username: data.account,
        password: data.password,
        mode: 'none', // 不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `欢迎回来：${userInfo.realname}`,
          duration: 3,
        });
      }
    } catch (err) {
      console.log(err);
      createErrorModal({
        title: '错误提示',
        content: (err as unknown as Error).message || '网络错误',
        // 冒号和()中间必须有空格
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
    // todo
  }
</script>

<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form :model="formData" v-show="getShow" :rules="getFormRules" class="enter-x p-4" ref="formRef">
    <Form.Item name="account" class="enter-x">
      <Input v-model:value="formData.account" size="large"></Input>
    </Form.Item>
    <Form.Item name="password" class="enter-x">
      <Input.Password v-model:value="formData.password" size="large"></Input.Password>
    </Form.Item>
    <Row>
      <Col :span="12" class="enter-x">
        <Form.Item>
          <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item class="text-right">
          <Button type="link" size="small"> 忘记密码？ </Button>
        </Form.Item>
      </Col>
    </Row>
    <Form.Item class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading"
        >登录</Button
      >
    </Form.Item>
    <Row class="enter-x">
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)"> 手机号登录 </Button>
      </Col>
      <Col :md="8" :xs="24" class="!my-2 !md:my-0 xs:my-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.LOGIN)"> 二维码登录 </Button>
      </Col>
      <Col :md="6" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)"> 注册 </Button>
      </Col>
    </Row>
  </Form>
</template>

<style scoped lang="less"></style>

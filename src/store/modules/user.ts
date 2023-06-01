/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:56:48
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 13:48:01
 * @FilePath: /v3ts-lockin/src/store/modules/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { UserInfo } from '#/store';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { defineStore } from 'pinia';
import { ErrorMessageMode } from '#/axios';
import { LoginParams, GetUserInfoModel } from '@/api/sys/model/userModel';
import { doLogout, loginApi, getUserInfo } from '@/api/user';
import { router } from '@/router';
import { PageEnum } from '@/enums/pageEnum';
import { usePermissionStore } from './permission';
import { RouteRecordRaw } from 'vue-router';
import { useMessage } from '@/hooks/web/useMessage';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getRoleList(): RoleEnum[] {
      // todo
      return this.roleList.length > 0 ? this.roleList : [];
    },
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string {
      // todo
      return this.token as string;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '';
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
    },
    /* 登陆方法 */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;
        this.setToken(token);

        // todo saveToken
        return this.afterLoginAction(goHome);
      } catch {}

      return null;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      // 获取用户信息
      const userInfo = await getUserInfo();
      // todo 获取角色权限信息
      // const { roles = [] } = userInfo;
      // if (isArray(roles)) {
      //   const roleList = roles.map((item) => item.value) as RoleEnum[];
      //   this.setRoleList(roleList);
      // } else {
      //   userInfo.roles = [];
      //   this.setRoleList([]);
      // }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      const userInfo = await this.getUserInfoAction();
      //todo 判断登录是否超时 / 判断路由是否添加
      const permissionStore = usePermissionStore();
      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        // router.addRoute
        permissionStore.setDynamicAddedRoute(true);
      }
      console.log(goHome, 'isGohome');
      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      return userInfo;
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销token失败');
        }
      }
      this.setToken(undefined);
      // this.sessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_HOME);
    },
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: 'waring',
        title: () => h('span', '温馨提示'),
        content: () => h('span', '是否确认退出系统？'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}

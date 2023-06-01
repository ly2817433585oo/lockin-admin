/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 12:00:52
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-03 14:20:41
 * @FilePath: /v3ts-lockin/types/store.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RoleInfo } from '@/api/sys/model/userModel';

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface LockInfo {
  // password required
  pwd?: string | undefined;
  // is it locked
  isLock?: boolean;
}

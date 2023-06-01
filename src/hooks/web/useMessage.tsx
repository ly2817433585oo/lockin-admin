/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-23 14:07:58
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 13:44:53
 * @FilePath: /v3ts-lockin/src/hooks/web/useMessage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';

import { Modal, message as Message, notification } from 'ant-design-vue';
import { isString } from '@/utils/is';

import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

export declare type NotificationPlacement = 'topleft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'waring' | 'success' | 'error' | 'info';
// 重新定义iconType的类型 原为string
export interface ModalOptioneEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: IconType;
}

export type ModalOptionsPartial = Partial<ModalOptioneEx> & Pick<ModalOptioneEx, 'content'>;

interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

function renderContent({ content }: Pick<ModalOptioneEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>;
  } else {
    return content;
  }
}
// create confirmation box
function createConfirm(options: ModalOptioneEx): ConfirmOptions {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  };
  return Modal.confirm(opt) as unknown as ConfirmOptions;
}

// 基础选项
const getBaseOptions = () => {
  return {
    okText: '确认',
    centered: true,
  };
};

// 自定义icon
const getIcon = (iconType: string) => {
  if (iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />;
  } else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />;
  } else if (iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info" />;
  } else {
    return <CloseCircleFilled class="modal-icon-error" />;
  }
};

//
function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'error'));
}

export function useMessage() {
  return {
    createErrorModal,
    notification,
    createMessage: Message,
    createConfirm: createConfirm,
  };
}

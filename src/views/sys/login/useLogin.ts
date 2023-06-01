/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-22 11:06:50
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-23 15:56:06
 * @FilePath: /v3ts-lockin/src/views/sys/login/useLogin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormInstance } from "ant-design-vue";
import { NamePath, RuleObject } from "ant-design-vue/lib/form/interface";
import { computed, Ref, ref,unref } from "vue";

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  // todo
  return { setLoginState, getLoginState };
}


export function userFormValid<T extends Object = any>(formRef:Ref<FormInstance>) {
  const validate = computed(()=>{
    const form =unref(formRef);
    return form?.validate ?? ((_nameList?:NamePath)=>Promise.resolve())
  })

  async function validForm() {
      const form = unref(formRef);
      if(!form) return;
      const data =await form.validate();
      return data as T
  }

  return  {validate,validForm}
}

export function useFormRules(formData?:Recordable) {
    const getAccountFormRule = computed(()=>createRule('请输入用户名'))
    const getPassWordFormRule = computed(()=>createRule('请输入用户名'));

    const getFormRules = computed(():{[k :string] :RuleObject | RuleObject[]} =>{
      const accountFormRule = unref(getAccountFormRule)
      const passwordFormRule = unref(getPassWordFormRule)

      switch(currentState) {
        default:
          return {
            account:accountFormRule,
            password:passwordFormRule
          }
      }
    })

    return {getFormRules}
}

function createRule(message:string):RuleObject | RuleObject[] {
  return [
    {
      required:true,
      message,
      trigger:'change'
    }
  ]
}
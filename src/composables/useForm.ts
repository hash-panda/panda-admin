/**
 * 表单组合式函数
 */
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';

export interface UseFormOptions<T = any> {
  initialValues?: T;
  rules?: Record<keyof T, any[]>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
}

export function useForm<T extends Record<string, any> = any>(options: UseFormOptions<T> = {}) {
  const {
    initialValues = {} as T,
    rules = {},
    onSubmit,
    onSuccess,
  } = options;

  const formRef = ref();
  const loading = ref(false);
  const formData = reactive<T>({ ...initialValues });

  /**
   * 验证表单
   */
  const validate = async (): Promise<boolean> => {
    try {
      await formRef.value?.validate();
      return true;
    } catch (error) {
      console.error('表单验证失败:', error);
      return false;
    }
  }

  /**
   * 重置表单
   */
  const reset = () => {
    formRef.value?.resetFields();
    Object.assign(formData, initialValues);
  };

  /**
   * 设置字段值
   */
  const setFieldsValue = (values: Partial<T>) => {
    Object.assign(formData, values);
  };

  /**
   * 获取字段值
   */
  const getFieldsValue = (): T => {
    return { ...formData };
  };

  /**
   * 清空字段值
   */
  const clearFields = () => {
    formRef.value?.clearValidate();
    Object.keys(formData).forEach((key) => {
      formData[key as keyof T] = undefined as any;
    });
  };

  /**
   * 提交表单
   */
  const handleSubmit = async () => {
    const valid = await validate();
    if (!valid) return;

    loading.value = true;
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      message.success('提交成功');
      onSuccess?.();
    } catch (error: any) {
      console.error('提交失败:', error);
      message.error(error.message || '提交失败');
    } finally {
      loading.value = false;
    }
  };

  /**
   * 设置字段错误
   */
  const setFieldsError = (errors: Partial<Record<keyof T, string>>) => {
    formRef.value?.setFieldsError(errors);
  };

  return {
    formRef,
    loading,
    formData,
    rules,
    validate,
    reset,
    setFieldsValue,
    getFieldsValue,
    clearFields,
    handleSubmit,
    setFieldsError,
  };
}

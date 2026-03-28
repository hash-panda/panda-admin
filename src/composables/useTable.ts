/**
 * 表格组合式函数
 */
import { ref, reactive, computed, onMounted } from 'vue';
import type { TableProps } from 'ant-design-vue';

export interface UseTableOptions<T = any> {
  api: (params: any) => Promise<{ list: T[]; total: number }>;
  immediate?: boolean;
  defaultParams?: Record<string, any>;
  pageSize?: number;
}

export function useTable<T = any>(options: UseTableOptions<T>) {
  const {
    api,
    immediate = true,
    defaultParams = {},
    pageSize = 10,
  } = options;

  const dataSource = ref<T[]>([]);
  const loading = ref(false);
  const pagination = reactive({
    current: 1,
    pageSize,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
  });

  const params = ref<Record<string, any>>({ ...defaultParams });

  /**
   * 加载数据
   */
  const loadData = async () => {
    loading.value = true;
    try {
      const res = await api({
        ...params.value,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
      dataSource.value = res.list || [];
      pagination.total = res.total || 0;
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 处理表格变化
   */
  const handleTableChange: TableProps['onChange'] = (pag) => {
    pagination.current = pag.current || 1;
    pagination.pageSize = pag.pageSize || pageSize;
    loadData();
  };

  /**
   * 刷新数据
   */
  const refresh = () => {
    pagination.current = 1;
    loadData();
  };

  /**
   * 搜索
   */
  const search = (searchParams: Record<string, any>) => {
    params.value = { ...defaultParams, ...searchParams };
    pagination.current = 1;
    loadData();
  };

  /**
   * 重置
   */
  const reset = () => {
    params.value = { ...defaultParams };
    pagination.current = 1;
    loadData();
  };

  if (immediate) {
    onMounted(() => {
      loadData();
    });
  }

  return {
    dataSource,
    loading,
    pagination,
    loadData,
    handleTableChange,
    refresh,
    search,
    reset,
  };
}

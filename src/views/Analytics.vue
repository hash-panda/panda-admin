<template>
  <div>
    <a-typography-title :level="2">数据分析</a-typography-title>
    <a-row :gutter="16" style="margin-top: 24px">
      <a-col :span="12">
        <a-card title="访问趋势">
          <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #fafafa;">
            <a-empty description="图表区域" />
          </div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="用户分布">
          <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #fafafa;">
            <a-empty description="图表区域" />
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-card title="数据统计" style="margin-top: 24px">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-statistic title="总访问量" :value="125680" suffix="次" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="平均停留时间" :value="5.2" suffix="分钟" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="转化率" :value="12.5" suffix="%" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
</script>

<template>
  <a-form-model
    class="search-box"
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字:">
      <a-input v-model="searchForm.searchword" placeholder="请输入搜索内容">
      </a-input>
    </a-form-model-item>
    <a-form-model-item lable="商品类目:">
      <a-select
        allowClear
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"

      >
        <a-select-option v-for="c in data" :key="c.id" :value='c.id'>
          {{c.name}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        searchword: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    // 点击提交表单的函数
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    // 切换类目的时候的函数
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>
<style lang="less" scoped>
.search-box{
  padding:10px 30px;
}
</style>

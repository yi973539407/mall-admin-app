<template>
    <div class="product-list">
       <!--搜索组件-->
        <Search  @submit="searchSubmit" :data='categoryList' />
        <a-button class="addButton">
          <router-link :to="{name:'ProductAdd'}">新增商品</router-link>
        </a-button>
        <!--表格组件-->
        <ProductsTable :data="TableData" :page='page' @change="changePage"
         :categoryList='categoryList'
          @editProduct='editProduct'
          @removeProduct='removeProduct' />
    </div>
</template>
<script>
import Search from '@/components/search.vue';
import ProductsTable from '@/components/productsTable.vue';
import api from '@/api/productsTable';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      TableData: [],
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryList: [],
      categoryobj: {},
    };
  },
  components: {
    Search,
    ProductsTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryobj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    removeProduct(record) {
      this.$confirm({
        title: '确定要删除吗',
        content: () => <div style="color:red;">{`确定要删除${record.title}的商品吗`}</div>,
        onOk: () => {
          console.log(record);
          api.remove({
            id: record.id,
          }).then(() => {
            console.log(this);
            this.getTableData();
          });
        },
        onCancel: () => {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    getTableData() {
      api.productsTable({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        this.page.total = res.total;
        this.TableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryobj[item.category].name,
        }));
      });
    },
  },

};
</script>
<style lang="less" scoped>
.product-list{
  position:relative;
  .addButton{
    position: absolute;
    right:10px;
    top:14px;
  }
}
</style>

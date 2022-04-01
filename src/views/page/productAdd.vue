<template>
  <div class="product-detail">
    <a-steps class="product-heard" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current===0" @next="next" :form='form' />
      <SaleDetail v-else-if='current===1' :form='form' @prev='prev' @next="next"/>
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import api from '@/api/productsTable';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },
      ],
    };
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      api.detail(id).then((res) => {
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        form,
        ...this.form,
      };
      if (this.current === 1) {
        if (this.$route.params.id) {
          api.edit(this.form).then(() => {
            this.$message.success('编辑成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.add(this.form).then(() => {
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
   .product-heard{
       width:50%;
       margin:20px auto;
   }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>

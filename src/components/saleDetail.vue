<template>
  <div class="saleDetail">
    <template>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 13 }"
      >
        <a-form-model-item label="商品售价" prop="price" required>
          <a-input v-model="form.price" />
        </a-form-model-item>
        <a-form-model-item label="商品折扣价" prop="price_off">
          <a-input v-model="form.price_off" />
        </a-form-model-item>
        <a-form-model-item label="商品库存" prop="inventory" required>
          <a-input v-model="form.inventory" />
        </a-form-model-item>
        <a-form-model-item label="计量单位" prop="unit" required>
          <a-input v-model="form.unit" />
        </a-form-model-item>
        <a-form-model-item label="商品相册" prop="images">
          <a-upload
            :action="
              'https://mallapi.duyiedu.com/upload/images?appkey=' +
              $store.state.user.appkey
            "
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            name="avatar"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-model-item>
        <a-form-model-item label=" "  class="btn" :wrapperCol="{span:24}">
          <a-button type="default" @click="prev">上一步</a-button>
          <a-button type="primary" @click="next">提交</a-button>
      </a-form-model-item>
      </a-form-model>
    </template>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      rules: {},
      fileList: [],
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,

      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        const obj = this.file;
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      console.log(file);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        this.form.images = this.form.images.filter((item) => item !== file.response.data.url);
      }
      this.fileList = fileList;
    },
    next() {
      this.$emit('next', this.form);
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

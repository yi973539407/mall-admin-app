<template>
  <div class="home">
    <LeftMenu :key='key'/>
    <div :class="{'main-app':true,'menu-unfold':$store.state.collapsed}">
      <Slider-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './menu.vue';
import SliderNav from './sliderNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/home.less";
</style>

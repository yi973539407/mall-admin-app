<template>
  <div class="home">
    <LeftMenu />
    <Slider-nav />
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
    };
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

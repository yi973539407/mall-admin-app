<template>

      <div class="main-header">
        <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="breadcrum">
        <a-breadcrumb v-if="currentRoute.length>1">
          <a-breadcrumb-item>{{currentRoute[0].meta.title?
            currentRoute[0].meta.title:''}}</a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name:currentRoute[1].name}">{{currentRoute[1].meta.title?
              currentRoute[1].meta.title:''}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <ul class="user-info">
        <li>
          {{$store.state.user.username}}
          <a-icon type="down" />
        </li>
        <li @click="layout">
          退出
        </li>
      </ul>
      </div>

</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    layout() {
      this.$store.dispatch('layout');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>

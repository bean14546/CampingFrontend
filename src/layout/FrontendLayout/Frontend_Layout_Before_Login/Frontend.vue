<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/frontend/BeforeLogin/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style></style>

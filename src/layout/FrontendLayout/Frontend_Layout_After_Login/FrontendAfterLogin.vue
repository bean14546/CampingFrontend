<template>
  <div>
    <Header @drawerEvent="drawer = !drawer" />
    <Sidebar :drawers="drawer" />
    <v-container>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/frontend/AfterLogin/HeaderAfterLogin.vue";
import Sidebar from "../../../components/frontend/AfterLogin/SideBarVuetify.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style></style>

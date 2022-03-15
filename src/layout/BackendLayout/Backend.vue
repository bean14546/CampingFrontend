<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    <Header @drawerEvent="drawer = !drawer" />
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
  </v-app>
</template>

<script>
import Sidebar from "../../components/backend/Sidebar.vue";
import Header from "../../components/backend/Header.vue";

export default {
  name: "App",
  components: { Header, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script>

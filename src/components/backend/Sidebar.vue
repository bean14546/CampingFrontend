<template>
  <v-navigation-drawer :value="drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://media.istockphoto.com/photos/sunrise-at-camp-in-the-holy-cross-wilderness-colorado-picture-id1317348954?k=20&m=1317348954&s=612x612&w=0&h=ty5TU0iPjCTBUOyhZ0FN0Cm6Idx5bez7aXbOBMiePYM="
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="white" size="64">
          <img
            style="width: 50px; height: 50px"
            aspect-ratio="30"
            src="@/assets/camp-logo.png"
          />
        </v-avatar>
        <h2 class="white--text">Camping Admin</h2>
      </div>
    </v-img>

    <v-divider></v-divider>

    <v-list v-for="(item, index) in links" :key="index">
      <router-link style="text-decoration: none" :to="item.link">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        {
          icon: "mdi-monitor-dashboard",
          text: "Dashboard",
          link: "/backend/dashboard",
        },
        {
          icon: "mdi-account-outline",
          text: "User",
          link: "/backend/user",
        },
        {
          icon: "mdi-package-variant-closed",
          text: "Products",
          link: "/backend/product",
        },

        {
          icon: "mdi-clipboard-list-outline",
          text: "Orders History",
          link: "/backend/order",
        },
      ],
    };
  },
};
</script>

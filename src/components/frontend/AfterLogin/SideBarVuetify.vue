<template>
  <div>
    <v-navigation-drawer app :value="drawers" color="#f7f7f7">
      <v-img
        height="140"
        class="pa-4"
        src="https://media.istockphoto.com/photos/camping-tent-with-bonfire-in-the-green-field-meadow-lake-and-mountain-picture-id1001514868?k=20&m=1001514868&s=612x612&w=0&h=Y7B1L4z5wQxYRoFAshD-qt_V-ae34Wu1GF8ct4eOC1s="
      >
        <div class="text-center">
          <router-link to="/frontend/product">
            <v-avatar class="mb-4" color="white" size="64">
              <img
                style="width: 50px; height: 50px"
                aspect-ratio="30"
                src="@/assets/camp-logo.png"
              />
            </v-avatar>
          </router-link>

          <h2 class="white--text font">Camping Store</h2>
        </div>
      </v-img>

      <v-divider></v-divider>

      <v-list v-for="(item, index) in links" :key="index">
        <router-link style="text-decoration: none" :to="item.link">
          <v-list-item link style="padding-left:60px">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-item">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawers: Boolean,
  },
  data() {
    return {
      links: [
        {
          icon: "bx bx-package",
          text: "Product All",
          link: "/frontend/product",
        },
        {
          icon: "bx bx-home-alt",
          text: "Tent",
          link: "/frontend/tent",
        },
        {
          icon: "bx bx-wrench",
          text: "Acessories",
          link: "/frontend/accessories",
        },
        {
          icon: "bx bx-bed",
          text: "Bedding",
          link: "/frontend/bedding",
        },
        {
          icon: "bx bx-closet",
          text: "Clothing",
          link: "/frontend/clothing",
        },
      
      ],
    };
  },
};
</script>

<style>
.font {
  font-family: kanit;
}
.font-item {
  font-family: kanit;
  color: #555555;
}
</style>

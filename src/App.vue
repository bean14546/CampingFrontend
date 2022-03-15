<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

let brand = " | Camping Shop"

export default {
  name: "App",

  watch:{
    $route(to){
      document.title = to.meta.title + brand
    }
  }
  }
</script>

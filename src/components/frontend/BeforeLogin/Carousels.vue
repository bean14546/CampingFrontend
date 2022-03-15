<template>
  <div>
    <v-carousel
      cycle
      height="92.8vh"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <section class="image">
              <v-img class="img" :src="slide.img" width="100%" height="100%">
              </v-img>
              <h1>Welcome To Camping Shop</h1>
              <h3>The largest in Thailand.</h3>
            </section>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [
        { img: require("@/assets/camping1.jpg") },
        { img: require("@/assets/camping2.jpg") },
        { img: require("@/assets/camping3.jpg") },
        { img: require("@/assets/camping4.jpg") },
      ],
    };
  },
};
</script>

<style scopped>
/* Section Carousels */
section.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;
  padding: 140px 100px;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}
.img:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #414a4f;
  opacity: 0.5;
}
h1 {
  font: bold 60px fantasy;
  margin-bottom: 15px;
  color: #fff;
  z-index: 1;
}
h3 {
  font: bold 35px fantasy;
  margin-bottom: 15px;
  color: #fff;
  z-index: 1;
}


</style>

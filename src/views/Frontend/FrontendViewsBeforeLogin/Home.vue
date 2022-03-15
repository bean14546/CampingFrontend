<template>
  <div class="home-template">
    <!-- Carousels -->
    <Carousels />

    <!-- Content -->
    <v-container>
      <section class="work">
        <h1 class="title1">some of our work</h1>
        <p>
          <v-card
            outlined
            class="mx-auto my-12 mr-10 card-outter-guest"
            min-width="350"
            max-width="350"
            v-for="item in guestProduct"
            :key="item.id"
          >
            <v-list-item tile size="auto" class="justify-center">
              <img height="200px" :src="item.image" />
            </v-list-item>

            <v-card-title>{{ item.name }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="15"
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>

              <div class="my-4 text-subtitle-1">
                ฿ {{ format_price(item.price) }}
              </div>

              <div class="descripion">
                {{ item.description }}
              </div>
            </v-card-text>

            <v-card-actions class="card-actions">
              <v-btn color="deep-purple lighten-2" text @click="goToSignIn">
                Add To Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </p>
        <hr />
      </section>
    </v-container>

    <section class="pic">
      <div class="grid">
        <img class="small" src="@/assets/hiking.jpg" />
        <img class="large" src="@/assets/mountaineer.jpg" />
        <img class="large" src="@/assets/tent.jpg" />
        <img class="small" src="@/assets/waterfall.jpg" />
      </div>
    </section>

    <section class="feture">
      <h1 class="title2">feature and servieces</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        obcaecati quod unde, quisquam atque inventore? Aliquid illo ducimus
        ipsam praesentium.
      </p>

      <ul class="grid2">
        <li>
          <i class="fa-solid fa-cart-arrow-down"></i>
          <h4>Selling</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ipsa aliquid qui harum molestias. Reiciendis facilis, unde
            blanditiis suscipit ipsam perspiciatis magnam inventore sunt
            assumenda, delectus maxime, nemo recusandae ut!
          </p>
        </li>
        <li>
          <i class="fa-solid fa-screwdriver-wrench"></i>
          <h4>Repair</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ipsa aliquid qui harum molestias. Reiciendis facilis, unde
            blanditiis suscipit ipsam perspiciatis magnam inventore sunt
            assumenda, delectus maxime, nemo recusandae ut!
          </p>
        </li>
        <li>
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
          <h4>Exchange</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ipsa aliquid qui harum molestias. Reiciendis facilis, unde
            blanditiis suscipit ipsam perspiciatis magnam inventore sunt
            assumenda, delectus maxime, nemo recusandae ut!
          </p>
        </li>
      </ul>
    </section>

    <section class="contact">
      <h3 class="title3">Join Our Newsletter</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        delectus quaerat laudantium doloremque accusantium suscipit tenetur ea
        illo sunt quasi explicabo voluptatum numquam labore accusamus cum eaque,
        ex nisi velit!
      </p>
      <hr />

      <form action="">
        <input type="email" placeholder="Email" />
        <a href="#" class="btn">subscribe</a>
      </form>
    </section>

    <!-- Footer -->
    <section>
      <Footer />
    </section>
  </div>
</template>

<script>
import Carousels from "@/components/frontend/BeforeLogin/Carousels.vue";
import Footer from "@/components/frontend/BeforeLogin/Footer.vue";
import http from "@/Services/FrontendService";

export default {
  name: "Home",
  data() {
    return {
      guestProduct: [],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  created() {
    http
      .get("productReadForGuest")
      .then((ressponse) => {
        console.log("guest", ressponse.data);
        this.guestProduct = ressponse.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    format_price(value) {
      let val = (value / 1).toFixed(2).replace(",", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    goToSignIn() {
      this.$router.push("/signin");
    },
  },
  components: {
    Carousels,
    Footer,
  },
};
</script>

<style>
.home-template {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Our Work */
section.work {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 100px 80px;
}
section .title1 {
  font: bold 32px fantasy;
  text-transform: capitalize;
  margin-bottom: 35px;
  color: #555;
}
section.work p {
  display: flex;
  flex-direction: row;
  line-height: 2;
  padding: 0;
  margin-bottom: 35px;
}
section.work hr {
  width: 180px;
  height: 2px;
  background-color: #2196f3;
  border: 0;
}

/* Sectiion Picture */
section.pic div.grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f7f7f7;
}
section.pic div.grid img {
  padding: 20px;
  height: 410px;
  background-position: center;
  background-clip: content-box;
  background-size: cover;
}
.pic .grid img.small {
  flex-basis: 40%;
}
.pic .grid img.large {
  flex-basis: 60%;
}

/* section feture */
section.feture {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 125px 100px;
}
section.feture h1 {
  text-transform: capitalize;
  font: bold 32px fantasy;
  margin-bottom: 35px;
  color: #555;
}
section.feture p {
  text-align: center;
  margin-bottom: 30px;
  line-height: 2;
  max-width: 800px;
  margin-bottom: 35px;
}
section.feture li {
  text-align: center;
}
section.feture .grid2 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
section.feture .grid2 li {
  flex-basis: 33%;
  padding: 0 20px;
}

/* Section Contact */
section.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 125px 200px;
  background-color: #f7f7f7;
}
section.contact .title3 {
  font: bold 36px fantasy;
  text-transform: capitalize;
  margin-bottom: 35px;
  color: #555;
}
section.contact p {
  text-align: center;
  line-height: 2;
  padding: 0 190px;
  margin-bottom: 35px;
}
section.contact hr {
  width: 180px;
  height: 2px;
  background-color: #2196f3;
  border: 0;
  margin-bottom: 35px;
}
section.contact form {
  display: flex;
  justify-content: center;
  max-width: 800px;
  width: 80%;
}
section.contact input {
  padding: 15px;
  flex: 1;
  border: solid 1px;
  border-radius: 5px;
  margin-right: 35px;
  color: #555;
}
section.contact .btn {
  color: #fff;
  padding: 18px 42px;
  background-color: #2196f3;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}
.v-sheet.v-card {
  border-color: rgb(180, 180, 180);
}
.v-sheet.v-card:hover {
  border-color: red;
}
.card-outter-guest {
  padding-bottom: 50px;
}
.card-outter-guest:hover {
  cursor: pointer;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  border-top: 1px solid rgb(180, 180, 180);
  width: 100%;
  bottom: 0;
}
.descripion {
  margin-top: 16px;
  min-height: 72px;
  margin: 16px 0;
}
</style>

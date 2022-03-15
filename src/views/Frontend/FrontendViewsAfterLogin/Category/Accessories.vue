<template>
  <div class="productComponent">
    <section class="product">
      <div class="item">
        <v-container>
          <template>
            <v-row>
              <v-card
                outlined
                class="mx-auto my-12 card-outter"
                min-width="350"
                max-width="350"
                v-for="item in productsFromDB"
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
                  <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="addToCart(item)"
                  >
                    Add To Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </template>
        </v-container>
      </div>
    </section>
  </div>
</template>

<script>
import http from "@/Services/FrontendService";

export default {
  data() {
    return {
      productsFromDB: [],
    };
  },
  methods: {
    addToCart(item) {
      let product = {
        id: item.id,
        image: item.image,
        name: item.name,
        amount: item.amount,
        price: item.price,
        category: item.category,
        description: item.description,
        total: item.price,
        qty: 1,
      };
      this.$store.dispatch("itemFromProduct", product);
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("close");
    },
    toggleSearch() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("close");
    },

    // Function จัด Format สกุลเงิน
    format_price(value) {
      let val = (value / 1).toFixed(2).replace(",", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    let category = "accessories";
    http
      .get(`productReadCategory/${category}`)
      .then((response) => {
        this.productsFromDB = response.data;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.header);
        }
      });
  },
};
</script>

<style>
.card {
  margin: 10px;
}
.v-sheet.v-card {
  border-color: rgb(180, 180, 180);
}
.v-sheet.v-card:hover {
  border-color: red;
}
.card-outter {
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

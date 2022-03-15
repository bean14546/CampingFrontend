<template>
  <div class="cart">
    <v-row>
      <v-col cols="9">
        <v-card elevation="5">
          <v-simple-table height="auto">
            <template>
              <thead>
                <tr>
                  <th class="text-center">Number</th>
                  <th class="text-center">Image</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Price</th>
                  <th class="text-center">Increase</th>
                  <th class="text-center">Amount</th>
                  <th class="text-center">Reduce</th>
                  <th class="text-center">Description</th>
                  <th class="text-center">total</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in cart" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td><img :src="item.image" width="50px" /></td>
                  <td>{{ item.name }}</td>
                  <td>{{ format_price(item.price) }}</td>
                  <td>
                    <i class="bx bx-minus minusQty" @click="reduce(item)"></i>
                  </td>
                  <td>
                    {{ item.qty }}
                  </td>
                  <td>
                    <i class="bx bx-plus plusQty" @click="increase(item)"></i>
                  </td>
                  <td>{{ item.description }}</td>
                  <td>{{ format_price(item.total) }}</td>
                  <td>
                    <i
                      class="bx bx-trash trash"
                      style="color: #888888"
                      @click="removeProduct(item)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="total" elevation="5" max-width="auto">
          <h4 style="color: #000; padding: 10px">
            Total : &nbsp;&nbsp;{{ format_price(total) }}&nbsp;&nbsp; Bath
          </h4>
        </v-card>
        <button
          @click="dialog = true"
          class="btn-checkout"
          medium
          elevation="2"
          color="primary"
        >
          Pay
        </button>
      </v-col>
    </v-row>

    <template>
      <v-row>
        <v-dialog v-model="dialog" max-width="800">
          <v-card>
            <v-card-title class="text-h5"> Order Confirmation </v-card-title>
            <v-card-text v-if="cart.length <= 0">
              <v-alert type="error"> You have not purchased the item. </v-alert>
            </v-card-text>
            <v-card-text v-if="cart.length > 0">
              <v-simple-table height="auto">
                <thead>
                  <tr>
                    <th class="text-center">Number</th>
                    <th class="text-center">Image</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Amount</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cart" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><img :src="item.image" width="50px" /></td>
                    <td>{{ item.name }}</td>
                    <td>{{ format_price(item.price) }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ format_price(item.total) }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-card-actions>
              <b>You have to pay</b>
              &nbsp;&nbsp;{{ format_price(total) }}&nbsp;&nbsp;
              <b>Bath</b>

              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                v-if="cart.length > 0"
              >
                CANCLE
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                v-if="cart.length <= 0"
              >
                OK
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="
                  dialog = false;
                  saveToDB();
                "
                v-if="cart.length > 0"
              >
                CONFIRM
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import http from "@/Services/FrontendService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      cart: [],
      dialog: false,
    };
  },
  methods: {
    increase(item) {
      item.qty = item.qty + 1;
      item.total = parseFloat(item.price) * item.qty;
      console.log(typeof item.total);
    },
    reduce(item) {
      item.qty = item.qty - 1;
      if (item.qty <= 1) {
        item.qty = 1;
      }
      item.total = parseFloat(item.price) * item.qty;
    },
    removeProduct(item) {
      var index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
      localStorage.removeItem("product");
    },

    saveToDB() {
      let userStorage = localStorage.getItem("user");
      let userStorageJSON = JSON.parse(userStorage);
      let user = userStorageJSON["user"];
      let user_id = user.id;

      this.cart.forEach((item) => {
        let product = {
          image: item.image,
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category,
          quantity: item.qty,
          total: item.total,
          user_id: user_id,
        };

        http
          .post("productHistoryCreate", product)
          .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Order Successfully!!!",
            }).then(() => {
              this.toggleDialogNewProduct = !this.toggleDialogNewProduct;
              window.location.href = "/frontend/product";
            });
          })
          .catch((error) => {
            if (error.response.status == 401) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: "You are not logged in!!!",
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: "Something went wrong!!!",
              });
            }
          });
      });
    },
    // Function จัด Format สกุลเงิน
    format_price(value) {
      let val = (value / 1).toFixed(2).replace(",", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    this.cart = this.$store.getters.itemInCart;
  },
  computed: {
    total() {
      var sum = 0;
      this.cart.forEach((item) => {
        sum += parseFloat(item.total);
      });
      return sum;
    },
  },
};
</script>

<style>
.minusQty {
  cursor: pointer;
}
.plusQty {
  cursor: pointer;
}
.trash {
  cursor: pointer;
  font-size: 20px;
}
button.btn-checkout {
  box-shadow: 0px 3px #888888;
  margin-top: 6px;
  padding: 10px 120px;
  text-decoration: none;
  background-color: #0cb937;
  border-radius: 8px;
  text-transform: uppercase;
  font: normal 16px sans-serif;
  font-weight: 800;
  color: #fff;
  opacity: 0.9;
}
button.btn-checkout:hover {
  box-shadow: 0px 3px #888888;
  margin-top: 6px;
  padding: 10px 120px;
  text-decoration: none;
  background-color: #0cb940;
  border-radius: 8px;
  text-transform: uppercase;
  font: normal 16px sans-serif;
  font-weight: 800;
  color: #fff;
  opacity: 1;
}
button.btn-checkout:active {
  box-shadow: 0px 0px #888888;
  margin-top: 6px;
  padding: 10px 120px;
  text-decoration: none;
  background-color: #0cb940;
  border-radius: 8px;
  text-transform: uppercase;
  font: normal 16px sans-serif;
  font-weight: 800;
  color: #fff;
  opacity: 0.9;
}
</style>

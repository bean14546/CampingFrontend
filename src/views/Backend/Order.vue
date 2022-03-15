<template>
  <div>
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg subheader">
      <h3 style="color: green; font-size: 30px">Order History</h3>
      <v-col lg="5" cols="6">
        <v-form @submit.prevent="search">
          <v-text-field
            v-model="keyword"
            class="p-0 m-0 mt-6"
            full-width
            dense
            append-icon="mdi-magnify"
            outlined
            rounded
            placeholder="Search"
          />
          <button @enter="search" type="submit" hidden></button>
        </v-form>
      </v-col>
    </v-subheader>

    <!-- Product -->
    <v-card elevation="2">
      <v-simple-table height="auto">
        <template>
          <thead>
            <tr>
              <th class="text-center">Number</th>
              <th class="text-center">Image</th>
              <th class="text-center">Name</th>
              <th class="text-center">Price</th>
              <th class="text-center">Purchase Amount</th>
              <th class="text-center">total</th>
              <th class="text-center">Description</th>
              <th class="text-center">User Image</th>
              <th class="text-center">ฺBought By</th>
              <th class="text-center">Date</th>
              <th class="text-center">Delete History</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td><img :src="item.image" width="50px" /></td>
              <td>{{ item.name }}</td>
              <td>{{ format_price(item.price) }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ format_price(item.total) }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-avatar size="30px" v-if="item.users.image == null"
                  ><img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                /></v-avatar>
                <v-avatar size="30px" v-if="item.users.image != null"
                  ><img :src="item.users.image"
                /></v-avatar>
              </td>
              <td>
                <span
                  >{{ item.users.firstName }} &nbsp;
                  {{ item.users.lastName }}
                </span>
              </td>
              <td>{{ format_date(item.created_at) }}</td>
              <td>
                <i
                  class="bx bx-trash trash-icon"
                  @click="DeleteProduct(item)"
                ></i>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import http from "../../Services/BackendService";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  data() {
    return {
      products: [],
      keyword: "",
    };
  },
  created() {
    http
      .get("productHistoryRead")
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    search() {
      if (this.keyword != "") {
        http.get(`productHistorySearch/${this.keyword}`).then((response) => {
          this.products = response.data;
        });
      } else {
        http
          .get("productHistoryRead")
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    DeleteProduct(item) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            http
              .delete(`productHistoryDelete/${item.id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("Deleted!", "Your file has been deleted.", "success")
                  .then(() => {
                    window.location.href = "/backend/order";
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
                    title: "Something went wrong!!! " + error.message,
                  });
                }
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Cancle Successfully!!!",
              "error"
            );
          }
        });
    },

    // Function จัด Format วันที่
    format_date(value) {
      return moment(String(value)).format("DD/MM/YYYY hh:mm:ss");
    },

    // Function จัด Format สกุลเงิน
    format_price(value) {
      let val = (value / 1).toFixed(2).replace(",", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>

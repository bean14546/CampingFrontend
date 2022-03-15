<template>
  <div>
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg subheader">
      <h3 style="color: green; font-size: 30px">Customer Information</h3>
      <v-col lg="6" cols="6">
        <form @submit.prevent="search">
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
        </form>
      </v-col>
    </v-subheader>

    <!-- User -->
    <v-card elevation="2">
      <v-simple-table height="auto">
        <template>
          <thead>
            <tr>
              <th class="text-center">Number</th>
              <th class="text-left">Image</th>
              <th class="text-center">Firstname</th>
              <th class="text-center">Lastname</th>
              <th class="text-center">Email</th>
              <th class="text-center">Phone Number</th>
              <th class="text-center">Gender</th>
              <th class="text-center">Created At</th>
              <th class="text-center">Updated At</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user,index) in users" :key="user.id">
              <td>{{ index+1 }}</td>
              <td>
                <v-avatar size="30px" v-if="user.image == null"
                  ><img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                /></v-avatar>
                <v-avatar size="30px" v-if="user.image != null"
                  ><img :src="user.image"
                /></v-avatar>
              </td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ format_date(user.created_at) }}</td>
              <td>{{ format_date(user.updated_at) }}</td>
              <td>
                <i
                  class="bx bx-trash trash-icon"
                  @click="DeleteProduct(user)"
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
      users: [],
      keyword: "",
      count: 0,
    };
  },
  created() {
    http
      .get("userRead")
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    search() {
      if (this.keyword != "") {
        http.get(`userSearch/${this.keyword}`).then((response) => {
          this.users = response.data;
        });
      } else {
        http
          .get("userRead")
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    DeleteProduct(user) {
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
              .delete(`userDelete/${user.id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("Deleted!", "Your file has been deleted.", "success")
                  .then(() => {
                    window.location.href = "/backend/user";
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
  },
};
</script>

<style>
.trash-icon {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: red;
}
.trash-icon:hover {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: rgb(220, 0, 0);
  cursor: pointer;
}
.btn {
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  margin: 0 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
}
.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.subheader {
  margin-top: -15px;
  margin-bottom: 10px;
}
</style>

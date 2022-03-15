<template>
  <div class="header">
    <v-app-bar app flat outlined rounded elevate-on-scroll elevation="3">
      <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <ul>
        <router-link to="/frontend/cart">
          <li class="li-cart"><i class="bx bx-cart icon-cart"></i>Cart</li>
        </router-link>
        <li>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <span style="cursor: pointer" v-bind="attrs" v-on="on">
                <v-chip link>
                  <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                    <v-avatar size="40" v-if="userInformation.image != null">
                      <v-img :src="userInformation.image" />
                    </v-avatar>

                    <v-avatar size="40" v-if="userInformation.image == null">
                      <v-img
                        src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                      />
                    </v-avatar>
                  </v-badge>
                  <span class="ml-3">
                    {{ userInformation.firstName }}
                    &nbsp;
                    {{ userInformation.lastName }}
                  </span>
                </v-chip>
              </span>
            </template>
            <v-list width="250" class="py-0">
              <v-list-item two-line>
                <v-list-item-avatar v-if="userInformation.image != null">
                  <img :src="userInformation.image" />
                </v-list-item-avatar>
                <v-list-item-avatar v-if="userInformation.image == null">
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ userInformation.firstName }}
                    &nbsp;
                    {{ userInformation.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider />

              <v-list-item link @click="EditUser">
                <v-list-item-icon>
                  <v-icon>bx bxs-user icon-profile</v-icon>
                </v-list-item-icon>
                <v-list-item-title> Edit Profile </v-list-item-title>
              </v-list-item>

              <v-list-item @click="logout" link>
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>
      </ul>
    </v-app-bar>

    <!-- Edit User -->
    <v-dialog v-model="toggleDialogEditUser" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="First Name"
                  :rules="editUser.editFirstNameRules"
                  v-model="editUser.editUserFirstName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Last Name"
                  :rules="editUser.editLastNameRules"
                  v-model="editUser.editUserLastName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone Number"
                  :rules="editUser.editPhoneNumberRules"
                  v-model="editUser.editUserPhoneNumber"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Gender"
                  :rules="editUser.editGenderRules"
                  v-model="editUser.editUserGender"
                  required
                ></v-text-field>
              </v-col>
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                  <v-avatar width="200px" height="200px">
                    <img
                      v-if="editUser.editUserImage"
                      :src="editUser.editUserImage"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="4"></v-col>
              </v-row>
              <v-col cols="12">
                <v-text-field
                  label="Link Image"
                  v-model="editUser.editUserImage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="toggleDialogEditUser = !toggleDialogEditUser"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitFormEditUser(editUser.editID)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "@/Services/FrontendService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      
      toggleDialogEditUser: false,
      userIDInformation: null,
      userInformation: {},
      editUser: {
        editID: null,
        editUserImage: "",

        editUserFirstName: "",
        editFirstNameRules: [
          (v) => !!v || "First Name is required",
          (v) =>
            (v && v.length <= 100) ||
            "First Name must be no more than 100 characters",
        ],

        editUserLastName: "",
        editLastNameRules: [
          (v) => !!v || "Last Name is required",
          (v) =>
            (v && v.length <= 100) ||
            "Last Name must be no more than 100 characters",
        ],

        editUserPhoneNumber: "",
        editPhoneNumberRules: [(v) => !!v || "Phone Number is required"],

        editUserGender: "",
        editGenderRules: [(v) => !!v || "Gender is required"],
      },
    };
  },
  methods: {
    
    logout() {
      http
        .post("logout")
        .then(() => {
          localStorage.removeItem("user");
          window.location.href = "/signin";
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.header);
          }
        });
    },
    EditUser() {
      let userStorage = localStorage.getItem("user");
      let userStorageJSON = JSON.parse(userStorage);
      let user = userStorageJSON["user"];
      http
        .get(`userReadID/${user.id}`)
        .then((response) => {
          this.editUser.editID = response.data.id;
          this.editUser.editUserImage = response.data.image;
          this.editUser.editUserFirstName = response.data.firstName;
          this.editUser.editUserLastName = response.data.lastName;
          this.editUser.editUserPhoneNumber = response.data.phoneNumber;
          this.editUser.editUserGender = response.data.gender;

          this.toggleDialogEditUser = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    submitFormEditUser(id) {
      let editUser = {
        image: this.editUser.editUserImage,
        firstName: this.editUser.editUserFirstName,
        lastName: this.editUser.editUserLastName,
        phoneNumber: this.editUser.editUserPhoneNumber,
        gender: this.editUser.editUserGender,
      };
      http
        .put(`userUpdate/${id}`, editUser)
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
            title: "Update Profile Successfully",
          }).then(() => {
            this.toggleDialogEditUser = !this.toggleDialogEditUser;
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
    },
  },
  created() {
    let userStorage = localStorage.getItem("user");
    let userStorageJSON = JSON.parse(userStorage);
    let user = userStorageJSON["user"];
    this.userIDInformation = user.id;
  },
  mounted() {
    http.get(`userReadID/${this.userIDInformation}`).then((response) => {
      this.userInformation = response.data;
    });
  },
};
</script>

<style>
ul {
  list-style: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
}
ul li {
  padding-top: 15px;
  padding-bottom: 17px;
  text-decoration: none;
  float: left;
  color: #555555;
}
ul li:hover {
  padding-top: 15px;
  padding-bottom: 17px;
  text-decoration: none;
  float: left;
  color: #000;
}
.li-cart {
  margin-right: 30px;
  padding-top: 18px;
  padding-bottom: 17px;
}
.li-cart:hover {
  margin-right: 30px;
  padding-top: 18px;
  padding-bottom: 17px;
}
.icon-cart {
  font-size: 20px;
  padding-right: 5px;
}
.icon {
  padding: 20px;
}

.icon-profile {
  font-size: 20px;
  padding-right: 5px;
}
.header {
  font-family: kanit, sans-serif;
}
</style>

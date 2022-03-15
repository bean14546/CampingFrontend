<template>
  <div>
    <v-app-bar app elevate-on-scroll elevation="3" color="white">
      <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
      <v-spacer />

      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span
            class="mx-5 mr-10"
            style="cursor: pointer"
            v-bind="attrs"
            v-on="on"
          >
          </span>
        </template>
        <v-list three-line width="250">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span style="cursor: pointer" v-bind="attrs" v-on="on">
            <v-chip link>
              <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                <v-avatar size="40" v-if="adminInformation.image != null">
                  <v-img :src="adminInformation.image" />
                </v-avatar>

                <v-avatar size="40" v-if="adminInformation.image == null">
                  <v-img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                  />
                </v-avatar>
              </v-badge>
              <span class="ml-3">
                {{ adminInformation.firstName }}
                &nbsp;
                {{ adminInformation.lastName }}
              </span>
            </v-chip>
          </span>
        </template>
        <v-list width="250" class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar v-if="adminInformation.image != null">
              <img :src="adminInformation.image" />
            </v-list-item-avatar>
            <v-list-item-avatar v-if="adminInformation.image == null">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ adminInformation.firstName }}
                &nbsp;
                {{ adminInformation.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />

          <v-list-item link @click="EditAdmin">
            <v-list-item-icon>
              <v-icon>bx bxs-user icon-profile</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Edit Profile </v-list-item-title>
          </v-list-item>

          <v-list-item @click="loggedOut" link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Edit Admin -->
    <v-dialog v-model="toggleDialogEditAdmin" persistent max-width="600px">
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
                  :rules="editAdmin.editFirstNameRules"
                  v-model="editAdmin.editAdminFirstName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Last Name"
                  :rules="editAdmin.editLastNameRules"
                  v-model="editAdmin.editAdminLastName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone Number"
                  :rules="editAdmin.editPhoneNumberRules"
                  v-model="editAdmin.editAdminPhoneNumber"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Gender"
                  :rules="editAdmin.editGenderRules"
                  v-model="editAdmin.editAdminGender"
                  required
                ></v-text-field>
              </v-col>
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                  <v-avatar width="200px" height="200px">
                    <img
                      v-if="editAdmin.editAdminImage"
                      :src="editAdmin.editAdminImage"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="4"></v-col>
              </v-row>
              <v-col cols="12">
                <v-text-field
                  label="Link Image"
                  v-model="editAdmin.editAdminImage"
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
            @click="toggleDialogEditAdmin = !toggleDialogEditAdmin"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitFormEditAdmin(editAdmin.editID)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "../../Services/BackendService";
import Swal from "sweetalert2";

export default {
  name: "Topbar",
  data() {
    return {
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      toggleDialogEditAdmin: false,
      adminIDInformation: null,
      adminInformation: {},
      editAdmin: {
        editID: null,
        editAdminImage: "",

        editAdminFirstName: "",
        editFirstNameRules: [
          (v) => !!v || "First Name is required",
          (v) =>
            (v && v.length <= 100) ||
            "First Name must be no more than 100 characters",
        ],

        editAdminLastName: "",
        editLastNameRules: [
          (v) => !!v || "Last Name is required",
          (v) =>
            (v && v.length <= 100) ||
            "Last Name must be no more than 100 characters",
        ],

        editAdminPhoneNumber: "",
        editPhoneNumberRules: [(v) => !!v || "Phone Number is required"],

        editAdminGender: "",
        editGenderRules: [(v) => !!v || "Gender is required"],
      },
    };
  },
  methods: {
    EditAdmin() {
      let userStorage = localStorage.getItem("user");
      let userStorageJSON = JSON.parse(userStorage);
      let user = userStorageJSON["user"];
      http
        .get(`userReadID/${user.id}`)
        .then((response) => {
          this.editAdmin.editID = response.data.id;
          this.editAdmin.editAdminImage = response.data.image;
          this.editAdmin.editAdminFirstName = response.data.firstName;
          this.editAdmin.editAdminLastName = response.data.lastName;
          this.editAdmin.editAdminPhoneNumber = response.data.phoneNumber;
          this.editAdmin.editAdminGender = response.data.gender;

          this.toggleDialogEditAdmin = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    submitFormEditAdmin(id) {
      let editAdmin = {
        image: this.editAdmin.editAdminImage,
        firstName: this.editAdmin.editAdminFirstName,
        lastName: this.editAdmin.editAdminLastName,
        phoneNumber: this.editAdmin.editAdminPhoneNumber,
        gender: this.editAdmin.editAdminGender,
      };
      http
        .put(`userUpdate/${id}`, editAdmin)
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
            this.toggleDialogEditAdmin = !this.toggleDialogEditAdmin;
            window.location.href = "/backend/dashboard";
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
    loggedOut() {
      http.post("logout").then(() => {
        localStorage.removeItem("user");
        window.location.href = "/signin";
      });
    },
  },
  created() {
    let userStorage = localStorage.getItem("user");
    let userStorageJSON = JSON.parse(userStorage);
    let user = userStorageJSON["user"];
    this.adminIDInformation = user.id;
  },
  mounted() {
    http.get(`userReadID/${this.adminIDInformation}`).then((response) => {
      this.adminInformation = response.data;
    });
  },
};
</script>

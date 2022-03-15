<template>
  <div class="">
    <v-form ref="form" v-model="valid">
      <v-card elevation="2" class="mx-auto signin" max-width="700px">
        <v-container>
          <v-row>
            <v-col class="avatar">
              <div>
                <v-list-item-avatar
                  tile
                  height="230px"
                  width="330px"
                  color="grey"
                >
                  <img :src="pic" />
                </v-list-item-avatar>
              </div>
            </v-col>
            <v-col class="field">
              <div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                  label="Password"
                  required
                ></v-text-field>

                <v-btn block @click="submit" color="green"> Sign In </v-btn>

                <v-btn block class="signup" @click="signup"> Sign Up </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-form>
    <div class="high"></div>
  </div>
</template>

<script>
import http from "../../../Services/AuthenService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      valid: true,

      pic: require('../../../assets/camping8.jpg'),

      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      password: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
    };
  },

  methods: {
    submit() {
      http
        .post("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
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
            title: "Signed in successfully...",
          }).then(() => {
            if (localStorage.getItem("user")) {
              let userStorage = localStorage.getItem("user");
              let userStorageJSON = JSON.parse(userStorage);
              let user = userStorageJSON["user"];

              if (user.role == 1) {
                // หาก role = 1 (Admin) ให้ส่งไปที่หน้า Dashboard
                window.location.href = "/backend/dashboard";
              } else {
                // Login ผ่าน ให้ส่งไปที่หน้า Product
                window.location.href = "/frontend/product";
              }
            }
          });
        })
        .catch((error) => {
          if (error.response.status) {
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
                title: "Invalid login information!!!",
              });
            }
            this.$refs.form.validate();
          }
        });
    },
    signup() {
      this.$router.push("/signup");
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
.high {
  height: 72px;
}
.avatar {
  padding-right: 20px;
}
.field {
  padding-left: 0;
  padding-right: 30px;
}
.signin {
  margin-top: 150px;
}
.signup {
  margin-top: 10px;
}
</style>

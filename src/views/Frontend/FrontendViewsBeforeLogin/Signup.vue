<template>
  <div class="signup">
    <v-form ref="form" v-model="valid">
      <v-card class="mx-auto" elevation="2" max-width="1100px">
        <v-container>
          <v-row>
            <v-col class="avatar">
              <div>
                <v-list-item-avatar tile size="600px" color="grey">
                  <img :src="pic" />
                </v-list-item-avatar>
              </div>
            </v-col>

            <v-col class="field">
              <v-text-field
                v-model="first_name"
                :rules="fnameRules"
                label="First Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="last_name"
                :rules="lnameRules"
                label="Last Name"
                required
              ></v-text-field>

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

              <v-text-field
                v-model="confirm_password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
                :rules="confirmRules"
                label="Confirm Password"
                required
              ></v-text-field>

              <v-text-field
                v-model="phone_number"
                :rules="phoneRules"
                label="Phone Number"
                required
              ></v-text-field>

              <v-text-field
                v-model="gender"
                :rules="genderRules"
                label="Gender"
                required
              ></v-text-field>

              <v-btn @click="submit" block color="green"> Sign Up </v-btn>
              <v-btn @click="signin" block class="signup"> Sign In </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import http from "@/Services/AuthenService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      valid: true,

      pic: require("../../../assets/camping7.jpg"),

      first_name: "",
      fnameRules: [
        (v) => !!v || "First Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      last_name: "",
      lnameRules: [
        (v) => !!v || "Last Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],

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

      confirm_password: "",
      confirmRules: [
        (v) => !!v || "Password Confirmation is required",
        (value) => value === this.password || "Password must match",
      ],

      phone_number: "",
      phoneRules: [
        (v) => !!v || "Phone Number is required",
        (v) =>
          (v && v.length <= 10) ||
          "Phone Number must be equal to  10 characters",
      ],
      gender: "",
      genderRules: [(v) => !!v || "Gender is required"],
    };
  },

  methods: {
    submit() {
      http
        .post("register", {
          firstName: this.first_name,
          lastName: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm_password,
          phoneNumber: this.phone_number,
          gender: this.gender,
        })
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
            title: "Signup successfully...",
          }).then(() => {
            this.$router.push("/signin");
          });
        })
        .catch((error) => {
          if (error.response) {
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
            }).then(() => {
              this.$refs.form.validate();
            });
          }
        });
    },
    signin() {
      this.$router.push("/signin");
    },
  },
};
</script>

<style>
.avatar {
  padding-right: 0;
}
.field {
  padding-left: 0;
  padding-right: 30px;
}
.avatar {
  padding-right: 0;
}
.signup {
  margin-top: 10px;
}
</style>

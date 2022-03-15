<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3 style="color: green">Dashboard</h3>
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
            placeholder="Search by ID only "
          />
          <button @enter="search" type="submit" hidden></button>
        </v-form>
      </v-col>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert dense text type="success">
          Login Successfully! Welcome to <strong>Admin Page</strong>
        </v-alert>
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span> {{ item.content }} </span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">A Product has delivered!</div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="2">
          <v-simple-table height="auto">
            <template>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Number</th>
                  <th class="text-left">Image</th>
                  <th class="text-left">Full Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Started On</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(user, index) in activeUsers" :key="user.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ user.active_users.id }}</td>

                  <td>
                    <v-avatar
                      size="30px"
                      v-if="user.active_users.image == null"
                    >
                      <img
                        src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                      />
                    </v-avatar>
                    <v-avatar
                      size="30px"
                      v-if="user.active_users.image != null"
                    >
                      <img :src="user.active_users.image" />
                    </v-avatar>
                  </td>
                  <td>
                    <span>
                      {{ user.active_users.firstName }}
                      &nbsp;
                      {{ user.active_users.lastName }}
                    </span>
                  </td>
                  <td>{{ user.active_users.email }}</td>
                  <td>{{ format_date(user.created_at) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from "../../Services/BackendService";
import moment from "moment";

export default {
  name: "Dashboard",
  data() {
    return {
      keyword: "",
      activityLog: [
        {
          title: "Total Products",
          amount: null,
          content: "All products currently...",
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Customer",
          amount: null,
          content: "All users currently...",
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Orders History",
          amount: null,
          content: "All orders history currently...",
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
        {
          title: "User Activity",
          amount: null,
          content: "All user activity currently...",
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
      ],
      activeUsers: [],
    };
  },
  created() {
    http.get("productCount").then((response) => {
      this.activityLog[0].amount = response.data;
    });

    http.get("userCount").then((response) => {
      this.activityLog[1].amount = response.data;
    });

    http.get("productHistoryCount").then((response) => {
      this.activityLog[2].amount = response.data;
    });

    http.get("activeUsersCount").then((response) => {
      this.activityLog[3].amount = response.data;
    });

    http.get("activeUsersRead").then((response) => {
      this.activeUsers = response.data;
    });
  },
  methods: {
    search() {
      if (this.keyword != "") {
        http.get(`activeUsersSearch/${this.keyword}`).then((response) => {
          this.activeUsers = response.data;
        });
      } else {
        http
          .get("activeUsersRead")
          .then((response) => {
            this.activeUsers = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    format_date(value) {
      return moment(String(value)).format("DD/MM/YYYY hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>

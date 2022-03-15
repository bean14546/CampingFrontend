<template>
  <div>
    <v-toolbar elevation="0" flat outlined rounded>
      <div class="icon">
        <router-link to="/">
          <v-app-bar-nav-icon><img class="logo-icon" src="@/assets/camp-logo.png" alt=""></v-app-bar-nav-icon>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <section>
        <ul class="nav">
          <router-link to="/"> <li>Home</li></router-link>
          <router-link to="/about"><li>About Us</li></router-link>
          <!-- <router-link to="/contact"> <li>Contact</li></router-link> -->
          <router-link to="/signup"><li>Sign Up</li></router-link>
          <router-link to="/signin">
            <button class="btn-signin" medium elevation="2" color="primary">
              Sign In
            </button>
          </router-link>
        </ul>
      </section>
    </v-toolbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Icon */
.logo-icon{
  width: 40px;
}

/* Navigation  */
ul.nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul.nav li {
  font-family: "Kanit", sans-serif;
  text-decoration: none;
  float: left;
  color: #000;
  padding: 20px;
}

ul.nav li:hover {
  float: left;
  color: #414a4f;
  text-decoration: underline;
  text-decoration-color: #414a4f;
  text-decoration-thickness: 2px;
  padding: 20px;
}

button.btn-signin {
  margin-top: 6px;
  padding: 15px 25px;
  text-decoration: none;
  background-color: #414a4f;
  border-radius: 8px;
  text-transform: uppercase;
  font: normal 16px sans-serif;
  font-weight: 800;
  color: #fff;
  opacity: 0.9;
}

.btn-signin:hover {
  opacity: 1;
}

.btn-signin:active {
  opacity: 0.9;
}
</style>

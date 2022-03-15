<template>
  <div class="about-template">
    <section class="about">
      <div class="main">
        <img :src="img" alt="" />
        <div class="about-text">
          <h1>About Us</h1>
          <h5>Student <span>& Deverloper</span></h5>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
            tempore reiciendis harum! Fuga enim reprehenderit numquam incidunt
            quaerat perspiciatis tempore repudiandae expedita, libero voluptates
            dicta! Non necessitatibus corrupti quam aliquid.
          </p>
          <button class="button" type="button">Let's Talk</button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/frontend/BeforeLogin/Footer.vue"

export default {
  name: "Home",
  components:{
    Footer
  },
  data() {
    return {
      img: require("@/assets/profile.jpg"),
    };
  },
};
</script>

<style>
.about-template {
  margin: 0;
  padding: 0;
  font-family: "Josefin", sans-serif;
  box-sizing: border-box;
}

.about {
  width: 100%;
  height: 100vh;
  padding: 100px 0px;
  background-color: #f7f7f7;
}

.about img {
  height: auto;
  width: 450px;
}
.about-text {
  height: auto;
  width: 550px;
}
.main {
  width: 1130px;
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.about-text h1 {
  color: #555;
  font-size: 80px;
  text-transform: capitalize;
  margin-bottom: 20px;
}
.about-text h5 {
  color: #555;
  font-size: 25px;
  text-transform: capitalize;
  margin-bottom: 25px;
  letter-spacing: 2px;
}

span {
  color: black;
}

.about-text p {
  color: #555;
  letter-spacing: 1px;
  line-height: 28px;
  font-size: 18px;
  margin-bottom: 45px;
}

.button {
  background: #f9004d;
  color: #fff;
  text-decoration: 2px solid transparent;
  font-weight: bold;
  padding: 13px 30px;
  border-radius: 30px;
  transition: 0.1s;
  border: 1px solid #f9004d;
}
.button:hover {
  background: transparent;
  color: #555;
  border: 1px solid #f9004d;
  cursor: pointer;
}
</style>

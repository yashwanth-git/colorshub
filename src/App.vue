<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
:root {
  --border-clr: #e9f2f9;
  --light-blue: #f5fcff;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
body {
  background: #fefeff;
  color: #333;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
}
p {
  margin: 0;
}
#app {
  position: relative;
}
.box-shadow {
  box-shadow: 0 0 25px 0 rgb(197 197 197 / 40%);
}
.btn {
  display: inline-block;
  border: 1px solid var(--border-clr);
  border-radius: 5px;
  background: inherit;
  cursor: pointer;
}
.btn:hover {
  background: var(--light-blue);
}
.Loader {
  background: #fff;
  height: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Loader__spin {
  width: 55px;
  height: 55px;
  border-radius: 50px;
  border: 5px solid #fff;
  background: transparent;
  border-color: #d9d9d9;
  position: relative;
  box-shadow: 0px 2px 5px -5px rgba(0, 0, 0, 0.8);
}

.Loader__spin::before {
  content: "";
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 5px solid;
  border-color: #3f72af transparent transparent transparent;
  background: black;
  position: absolute;
  top: -5px;
  left: -5px;
  background: transparent;
  animation: rotate 1.12s cubic-bezier(0.64, 0.5, 0.01, 0.55) infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

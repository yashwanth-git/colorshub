<template>
  <header class="Navbar">
    <router-link to="/" class="Navbar__link">
      <div class="Logo">
        <img src="../assets/logo.png" width="30" height="30" />
        <p>Colorshub</p>
      </div>
    </router-link>
    <nav>
      <ul class="Navbar__items">
        <li class="Navbar__item">
          <router-link to="/create" class="Navbar__link">Create</router-link>
        </li>
        <li class="Navbar__item">
          <router-link to="/saved" class="Navbar__link">Saved</router-link>
        </li>
        <li class="Navbar__item">
          <router-link to="/about" class="Navbar__link">About</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.Navbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 2em;
  background: #fff;
  box-shadow: 0 0 25px 0 rgb(197 197 197 / 40%);
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
}
.Logo {
  display: flex;
  align-items: center;
}
.Logo img {
  margin-right: 0.4em;
}
.Navbar__items {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
}
.Navbar__item {
  margin-left: 1em;
  font-size: 1rem;
  font-weight: 300;
}
.Navbar__link {
  cursor: pointer;
  text-decoration: none;
  color: #333;
}
@media screen and (max-width: 27em) {
  .Navbar {
    justify-content: center;
    padding-top: 1em;
  }
}
</style>
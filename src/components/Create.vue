<template>
  <div class="Create">
    <p class="Create__heading">Create a Color Palette!</p>
    <div class="Create__item box-shadow">
      <input v-model="colors.c1" type="color" @change="colorChanged" class="color C1" />
      <input v-model="colors.c2" type="color" @change="colorChanged" class="color C2" />
      <input v-model="colors.c3" type="color" @change="colorChanged" class="color C3" />
      <input v-model="colors.c4" type="color" @change="colorChanged" class="color C4" />
    </div>
    <button v-show="isChanged" @click="createPalette" class="btn create-btn">Create</button>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Create",
  data() {
    return {
      colors: {
        id: uuidv4(),
        c1: "#DDDDDD",
        c2: "#cccccc",
        c3: "#bbbbbb",
        c4: "#aaaaaa",
      },
      isChanged: false,
    };
  },
  methods: {
    colorChanged() {
      this.isChanged = true;
      console.log(`Colors changed ${this.colors.id}`);
    },
    createPalette() {
      db.collection("colors")
        .add({
          id: this.colors.id,
          c1: this.colors.c1,
          c2: this.colors.c2,
          c3: this.colors.c3,
          c4: this.colors.c4,
          created: Date.now(),
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
    // toHex(r, g, b) {
    //   return [r, g, b]
    //     .reduce((acc, curr) => {
    //       let hex = Number(curr).toString(16);
    //       acc.push(hex.length < 2 ? (hex = "0" + hex) : hex);
    //       return acc;
    //     }, [])
    //     .join("");
    // },
  },
};
</script>

<style scoped>
.Create {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 7em 2em;
}
.Create__heading {
  font-size: 1.5rem;
  margin-bottom: 1em;
}
.Create__item {
  display: flex;
  flex-direction: column;
  flex: 1 1 20em;
  width: 20em;
  padding: 1em;
  border-radius: 5px;
}
.C1 {
  flex: 3 1;
}
.C2 {
  flex: 2 1;
}
.C3 {
  flex: 1.5 1;
}
.C4 {
  flex: 1 1;
}
.Create__item .color {
  width: 100%;
  -webkit-appearance: none;
  padding: 0;
  border: none;
}
.Create__item .color::-webkit-color-swatch-wrapper {
  padding: 0;
}
.Create__item .color::-webkit-color-swatch {
  border: none;
}
.create-btn {
  padding: 0.5em 1em;
  margin-top: 1em;
  font-size: 1rem;
}
</style>
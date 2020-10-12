<template>
  <div class="Saved">
    <div v-if="visible" class="not-found">
      <img src="../assets/not-found.svg" alt="not-found" class="img-fluid" />
      <p>Nothing found in saved</p>
      <router-link to="/" class="btn btn-browse">Browse palettes</router-link>
    </div>
    <div
      v-else
      v-for="(color, id) in colors"
      v-bind:key="id"
      class="Dashboard__Palette box-shadow"
    >
      <div class="Palette">
        <div
          :style="{ 'background-color': color.c1 }"
          class="color C1"
          v-clipboard="() => color.c1"
          v-clipboard:success="copyColor"
          @click="change($event)"
        >
          <span>{{ color.c1 }}</span>
          <div class="tooltip">Copied</div>
        </div>
        <div
          :style="{ 'background-color': color.c2 }"
          class="color C2"
          v-clipboard="() => color.c2"
          v-clipboard:success="copyColor"
          @click="change($event)"
        >
          <span>{{ color.c2 }}</span>
          <div class="tooltip">Copied</div>
        </div>
        <div
          :style="{ 'background-color': color.c3 }"
          class="color C3"
          v-clipboard="() => color.c3"
          v-clipboard:success="copyColor"
          @click="change($event)"
        >
          <span>{{ color.c3 }}</span>
          <div class="tooltip">Copied</div>
        </div>
        <div
          :style="{ 'background-color': color.c4 }"
          class="color C4"
          v-clipboard="() => color.c4"
          v-clipboard:success="copyColor"
          @click="change($event)"
        >
          <span>{{ color.c4 }}</span>
          <div class="tooltip">Copied</div>
        </div>
      </div>
      <div class="Palette__cta">
        <button class="save-btn btn" @click="unsave(color.id)">Unsave</button>
        <span class="time">{{ color.created | momentFilter }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Saved {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 5em 2em;
}
.not-found {
  text-align: center;
}
.not-found p {
  margin-top: 1em;
  font-size: 1.5rem;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
.btn-browse {
  text-decoration: none;
  color: inherit;
  padding: 0.5em 1em;
  margin-top: 1em;
}
</style>

<script>
import moment from "moment";
export default {
  name: "Saved",
  data() {
    return {
      colors: [],
      visible: true,
      loading: false,
    };
  },
  created() {
    if (localStorage.length !== 0) {
      for (let i = 0; i < localStorage.length; i++) {
        //Checking if the value is the value stored by us
        //Since by default browser has some locally stored values
        if (localStorage.key(i).substring(0, 8) === "palette-") {
          this.visible = false;
          let item = localStorage.getItem(localStorage.key(i));
          item = JSON.parse(item);
          this.colors.push(item);
          //console.log(this.colors);
        }
      }
    }
  },
  methods: {
    copyColor({ value }) {
      console.log("success", value);
    },
    change(event) {
      event.target.children[1].classList.add("open");
      setInterval(() => {
        event.target.children[1].classList.remove("open");
      }, 2000);
    },
    unsave(id) {
      this.colors = this.colors.filter((color) => color.id !== id);
      localStorage.removeItem(`palette-${id}`);
      if (localStorage.length === 0) {
        this.visible = true;
      }
    },
  },
  filters: {
    momentFilter(date) {
      let newDate = moment(date).format("DD MMM YYYY hh:mm a");
      return moment(newDate).fromNow();
    },
  },
};
</script>
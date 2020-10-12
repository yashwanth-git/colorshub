<template>
  <div class="Dashboard">
    <div v-if="loading" class="Loader">
      <div class="Loader__spin"></div>
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
        <button class="save-btn btn" @click="saved($event, color.id)">
          {{ color.buttonText }}
        </button>
        <span class="time">{{ color.created | momentFilter }}</span>
      </div>
    </div>
    <button class="btn more-btn" @click="more">Load More</button>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import moment from "moment";
export default {
  name: "Dashboard",
  data() {
    return {
      start: 0,
      colors: [],
      loading: false,
      buttonText: "Save",
    };
  },
  async created() {
    this.loading = true;
    db.collection("colors")
      .orderBy("created", "desc")
      .limit(8)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            c1: doc.data().c1.toUpperCase(),
            c2: doc.data().c2.toUpperCase(),
            c3: doc.data().c3.toUpperCase(),
            c4: doc.data().c4.toUpperCase(),
            created: doc.data().created,
            buttonText: "Save",
          };
          for (let i = 0; i < localStorage.length; i++) {
            if (doc.id === localStorage.key(i).substring(8, 28)) {
              data.buttonText = "Saved";
            }
          }
          this.colors.push(data);
        });
        this.start = querySnapshot.docs[querySnapshot.docs.length - 1];
      });
    this.loading = false;
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
    saved(event, id) {
      event.target.innerText = "Saved";
      let filteredColor = this.colors.filter((color) => color.id === id);
      //console.log(...filteredColor);
      localStorage.setItem(`palette-${id}`, JSON.stringify(...filteredColor)); //Storing it with separate ID
    },
    more() {
      this.loading = true;
      //console.log(this.start);
      db.collection("colors")
        .orderBy("created", "desc")
        .startAfter(this.start) //To resume from the remaining
        .limit(8)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              c1: doc.data().c1.toUpperCase(),
              c2: doc.data().c2.toUpperCase(),
              c3: doc.data().c3.toUpperCase(),
              c4: doc.data().c4.toUpperCase(),
              created: doc.data().created,
              clicked: false,
              buttonText: "Save",
            };
            this.colors.push(data);
          });
          this.start = querySnapshot.docs.length - 1; //Setting up the next start value
        });
      this.loading = false;
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
<style>
.Dashboard {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 5em 2em;
}
.Dashboard__Palette {
  display: flex;
  flex-direction: column;
  flex: 0 0 18em;
  padding: 1em;
  border-radius: 5px;
  height: 19em;
  margin: 1em;
}
.Palette {
  display: flex;
  flex-direction: column;
  flex: 1 1;
}
.color {
  position: relative;
  cursor: pointer;
}
.color span {
  position: absolute;
  bottom: 0;
  padding: 0 0.3em;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}
.color:hover span {
  opacity: 1;
}
.tooltip:before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 50%;
  top: -0.4em;
  width: 0;
  height: 0;
  border-left: 0.2em solid transparent;
  border-right: 0.2em solid transparent;
  border-bottom: 0.4em solid rgba(0, 0, 0, 0.8);
}
.tooltip {
  position: absolute;
  bottom: -3em;
  z-index: 2;
  background: rgba(12, 12, 12, 0.8);
  color: #fff;
  font-weight: 400;
  font-size: 0.8rem;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  transform: translateY(-1em);
  opacity: 0;
  transition: all 200ms ease-in;
}
.tooltip.open {
  transform: translateY(0);
  opacity: 1;
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
.Palette__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1em;
}
.save-btn {
  padding: 0.5em 1em;
  font-weight: 500;
  font-size: 1rem;
}
.more-btn {
  position: absolute;
  bottom: 2em;
  padding: 1em 1.5em;
  font-weight: 500;
  font-size: 0.85rem;
}
.time {
  font-size: 0.825rem;
}
</style>
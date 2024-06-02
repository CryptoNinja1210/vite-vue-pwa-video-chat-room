<template>
  <div class="about">
    <hms-prebuilt v-if="show" :room-code="roomCode" :logo="logoPath"></hms-prebuilt>
    <div class="input-invite-code" v-else>
      <input v-model="roomCode" />
      <button @click="start">Show</button>
    </div>
  </div>
</template>

<script>
import r2wc from "@r2wc/react-to-web-component";
import { HMSPrebuilt } from "@100mslive/roomkit-react";
export default {
  name: "VonageVideo",
  props: ['uuid'],
  components: {},
  data() {
    return {
      roomCode: null,
      show: false,
    }
  },
  mounted() {
    let HMSPrebuiltWebComponent = r2wc(HMSPrebuilt, {
      props: {
        roomCode: "string",
        authToken: "string",
        roomId: "string",
        role: "string",
        options: "json",
        onLeave: "function",
        logoPath: localStorage.getItem("logoPath"),
      }
    });
    if (!customElements.get('hms-prebuilt')) {
      customElements.define('hms-prebuilt', HMSPrebuiltWebComponent);
    }
  },
  created() {
    this.roomCode = null;
  },
  beforeUnmount() {
    customElements.define('hms-prebuilt', null);
  },
  methods: {
    start() {
      if (this.roomCode) {
        this.show = true
      } else {
        alert('Please input invite code!')
      }
    }
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  padding: 10px;
}

.input-invite-code {
  display: flex;
  justify-content: center;
  margin: 100px auto 100px;
}

.input-invite-code input {
  outline: none;
  padding: 10px;
}

.input-invite-code button {
  margin-left: 20px;
  padding: 10px;
}
</style>
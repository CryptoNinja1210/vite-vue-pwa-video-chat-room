<template>
  <div class="about">
    <hms-prebuilt v-if="show" :room-code="roomCode"></hms-prebuilt>
    <div class="input-invite-code" v-else>
      <input v-model="roomCode" />
      <button @click="start">Show</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import r2wc from '@r2wc/react-to-web-component'
import { HMSPrebuilt } from '@100mslive/roomkit-react'

class HmsPrebuiltElement extends HTMLElement {
  constructor() {
    super()
    // Add any necessary setup code here
  }
}

export default defineComponent({
  name: 'HelloView',
  setup() {
    const roomCode = ref<string | null>(null)
    const show = ref(false)

    onMounted(() => {
      let HMSPrebuiltWebComponent = r2wc(HMSPrebuilt, {
        props: {
          roomCode: 'string'
          // authToken: 'string',
          // roomId: 'string',
          // role: 'string',
          // options: 'json',
          // onLeave: 'function',
        }
      })
      if (!customElements.get('hms-prebuilt')) {
        customElements.define('hms-prebuilt', HMSPrebuiltWebComponent)
      }
    })

    onBeforeUnmount(() => {
      customElements.define('hms-prebuilt', HmsPrebuiltElement)
    })

    const start = () => {
      if (roomCode.value) {
        show.value = true
      } else {
        alert('Please input invite code!')
      }
    }

    return {
      roomCode,
      show,
      start
    }
  }
})
</script>

<style scoped>
.about {
  width: 100vw;
  max-width: 1240px;
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

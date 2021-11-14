<template>
  <div>
    <button @click="handleClick">切换</button>
    <HelloWorld msg="Welcome 1" key="1" v-if="type === 1" />
    <HelloWorld msg="Welcome 2" key="2" v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const type = ref(1);

    return {
      type,
      handleClick: () => {
        if (type.value === 1) {
          type.value = 2;
        } else {
          type.value = 1;
        }
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <button @click="handleClick">切换</button>
    <HelloWorld v-if="type === 1" msg="Welcome 1" key="1" />
    <HelloWorld v-else msg="Welcome 2" key="2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  type = 1;

  handleClick() {
    if (this.type === 1) {
      this.type = 2;
    } else {
      this.type = 1;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

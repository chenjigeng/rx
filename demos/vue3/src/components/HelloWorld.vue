<template>
  <div class="hello">
    <div>{{ count }}{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useFetch } from '../../../../packages/rx-vue3/lib/index';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const count = ref(0);

    useFetch(
      () => {
        count.value = count.value + 1;
      },
      {
        refreshInterval: 5000,
        autoClear: true,
      }
    );

    return {
      count,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

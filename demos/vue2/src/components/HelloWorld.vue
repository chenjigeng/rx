<template>
  <div>{{ count }} {{ msg }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { useFetch } from '../../../../packages/rx/lib';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  count = 0;

  mounted() {
    useFetch.call(
      this,
      () => {
        this.count++;
      },
      {
        refreshInterval: 5000,
        autoClear: true,
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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

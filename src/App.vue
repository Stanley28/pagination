<script setup>
import { ref } from "vue";
import Pagination from "./components/PaginationComponent.vue";

const page = ref(1);
</script>

<template>
  <div class="container">
    <main class="page">
      {{ page }}
    </main>
    <div class="pagination-wrapper">
      <Pagination v-model="page" :totalCount="90" :perPageCount="10" />
    </div>
  </div>
</template>

<style lang="stylus">
html
  font-size 16px
  height 100%
body
  margin 0
  font-family Arial, Helvetica, sans-serif
  height 100%
.container
  padding 2rem
  text-align center
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
.page
  font-size 7rem
  font-weight bold
  margin 0 0 3rem
.pagination-wrapper
  display inline-block
</style>

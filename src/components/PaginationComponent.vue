<script setup>
import usePagination from "@/composition/usePagination";

const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  perPageCount: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const {
  maxPagesToShowCount,
  allPagesList,
  pagesList,
  currentPage,
  showPreviousButton,
  isMoreThanMax,
  showNextButton,
  onPageClick,
} = usePagination(props, emit);
</script>

<template>
  <ul class="pagination">
    <li
      class="pagination__item"
      :class="{ 'pagination__item--hidden': !showPreviousButton }"
      @click="onPageClick(currentPage - 1)"
    >
      ←
    </li>
    <template v-if="pagesList[0] !== 1">
      <li
        class="pagination__item"
        :class="{ 'pagination__item--active': currentPage === 1 }"
        @click="onPageClick(1)"
      >
        1
      </li>
      <li
        v-show="pagesList[0] - 1 > 1 && isMoreThanMax"
        class="pagination__item pagination__item--no-hover"
      >
        ...
      </li>
    </template>
    <li
      v-for="page in pagesList"
      :key="page"
      class="pagination__item"
      :class="{ 'pagination__item--active': currentPage === page }"
      @click="onPageClick(page)"
    >
      {{ page }}
    </li>
    <template v-if="pagesList[pagesList.length - 1] !== allPagesList.length">
      <li
        v-show="
          pagesList[pagesList.length - 1] + 1 <
            allPagesList[allPagesList.length - 1] && isMoreThanMax
        "
        class="pagination__item pagination__item--no-hover"
      >
        ...
      </li>
      <li
        v-show="isMoreThanMax"
        class="pagination__item"
        :class="{
          'pagination__item--active': currentPage === allPagesList.length,
        }"
        @click="onPageClick(allPagesList.length)"
      >
        {{ allPagesList.length }}
      </li>
    </template>
    <li
      class="pagination__item"
      :class="{ 'pagination__item--hidden': !showNextButton }"
      @click="onPageClick(currentPage + 1)"
    >
      →
    </li>
  </ul>
</template>

<style lang="stylus" scoped>
.pagination
  display flex
  align-items center
  font-size 2rem
  gap 15px
  color black
  &__item
    list-style none
    padding 10px
    cursor pointer
    &:hover
      background black
      color white
      border-radius 4px
    &--no-hover
      &:hover
        background initial
        color initial
    &--hidden
      opacity 0
      visibility hidden
      pointer-events none
    &--active
      font-weight bold
      cursor default
      &:hover
        background initial
        color initial
</style>

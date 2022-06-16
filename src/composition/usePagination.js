import { computed, ref } from "vue";

export default (props, emit) => {
  const maxPagesToShowCount = 7;
  const currentPage = ref(props.modelValue);

  // Вычисляемые свойства
  const allPagesList = computed(() =>
    // Формирование и заполнение массива числами
    Array(Math.ceil(props.totalCount / props.perPageCount))
      .fill(0)
      .map((value, index) => index + 1)
  );
  const isMoreThanMax = computed(
    () => allPagesList.value.length > maxPagesToShowCount
  );
  const pagesList = computed(() => {
    if (isMoreThanMax.value) {
      // При большом количестве страниц будем показывать текущую страницу
      // и по одной с обеих сторон от нее, если возможно
      const list = [];

      // Крайний случай, при выборе последней страницы
      if (currentPage.value === allPagesList.value.length) {
        list.push(allPagesList.value.length - 2);
      }

      if (currentPage.value - 1 !== 0) {
        list.push(currentPage.value - 1);
      }

      list.push(currentPage.value);

      if (currentPage.value + 1 < allPagesList.value.length) {
        list.push(currentPage.value + 1);
      }
      // Крайний случай, при выборе первой страницы
      if (currentPage.value === 1) {
        list.push(currentPage.value + 2);
      }

      return list;
    }

    return allPagesList.value;
  });
  const showPreviousButton = computed(() => currentPage.value > 1);
  const showNextButton = computed(
    () => currentPage.value < allPagesList.value.length
  );

  // Методы
  const setCurrentPage = (page) => (currentPage.value = page);
  const onPageClick = (page) => {
    if (currentPage.value !== page) {
      setCurrentPage(page);

      emit("update:modelValue", page);
    }
  };

  return {
    maxPagesToShowCount,
    currentPage,
    allPagesList,
    isMoreThanMax,
    pagesList,
    showPreviousButton,
    showNextButton,
    onPageClick,
  };
};

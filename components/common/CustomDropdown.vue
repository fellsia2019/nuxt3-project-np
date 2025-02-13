<template>
  <div class="custom-dropdown" :class="{ 'custom-dropdown--is-opened': isOpened }" ref="rootEl">
    <div class="custom-dropdown__inner">
      <div class="custom-dropdown__head" @click="toggle">
        <CustomInput
          class="custom-dropdown__input"
          :modelValue="searchValueModel"
          :placeholder="placeholder"
          :readonly="!withSearch"
          @update:modelValue="onInputSearch"
        >
          <div class="custom-dropdown__label">
            <span>
              {{ placeholder }}
            </span>
            <SvgIcon v-if="withSearch" icon="search" class="custom-dropdown__icon-search" />
          </div>
        </CustomInput>
        <div class="custom-dropdown__icon-arrow">
          <CustomIconArrow :isReverse="isOpened" :size="CustomIconArrowSizeSettings.SM" />
        </div>
      </div>

      <div v-if="options?.length" class="custom-dropdown__window">
        <ul v-if="searchedOptions?.length" class="custom-dropdown__window-list">
          <li
            v-for="option in searchedOptions"
            :key="`custom-dropdown__window-item-${option.id}`"
            class="custom-dropdown__window-item"
            @click="select(option)"
          >
            <span v-html="option.name" />
          </li>
        </ul>
        <div v-else class="custom-dropdown__window-void">
          Ничего не найдено
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IDropdownOption } from '~/types/common/CustomDropdown'
import { CustomIconArrowSizeSettings } from '~/types/common/CustomIcons'

type modelValueType = string | number | null;

interface IEmits {
  (e: 'update:modelValue', value: modelValueType): void
}

interface IProps {
  withSearch?: boolean;
  options: Array<IDropdownOption>;
  placeholder?: string;
  withPreinitAfterClear?: boolean;
  modelValue: modelValueType;
  selectAllOptionId?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  withSearch: true,
  placeholder: 'Список',
  withPreinitAfterClear: false,
  selectAllOptionId: 'all'
})

const emits = defineEmits<IEmits>()

const rootEl = ref(null)

const isOpened = ref(false)
const searchValue = ref('')

const searchValueModel = computed({
  get() {
    return props.withSearch ?
      isOpened.value
        ? searchValue.value
        : caption.value
      : caption.value
  },
  set(value: string) {
    searchValue.value = value;
  }
})

const searchedOptions = computed<Array<IDropdownOption>>(() => {
  const search = searchValue.value.trim().toLowerCase()
  return search.length
    ? props.options.filter(option => option.name.trim().toLowerCase().includes(search))
    : props.options
})

const caption = computed(() => {
  const captionFromOptions = props.options.find(
    (item) => item.id === props.modelValue
  )

  return captionFromOptions
    ? captionFromOptions.name
    : ''
})

function clearSearch() {
  searchValueModel.value = '';
}

function selectHadler(id: number | string) {
  emits('update:modelValue', id)
}

function toggle() {
  isOpened.value = !isOpened.value;

  if (!isOpened.value) {
    clearSearch();
  }
}

function select(option: IDropdownOption) {
  selectHadler(option.id)

  if (props.withSearch) {
    clearSearch();
  }

  toggle();
}

function closeOther(e: Event) {
  if (!e?.target || !(e.target instanceof HTMLElement)) {
    return
  }

  const el = e.target.closest('.custom-dropdown');

  if (
    !(
      e.target.classList.contains('custom-dropdown') ||
      (el && el === rootEl.value)
    )
  ) {
    isOpened.value = false;
    clearSearch();
  }
}

function onInputSearch(value: modelValueType) {
  searchValue.value = String(value);
}

onMounted(() => {
  if (import.meta.server) {
    return
  }

  window.addEventListener('click', closeOther);
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeOther);
})
</script>

<style lang="scss">
$b: '.custom-dropdown';

#{$b} {

  // .custom-dropdown__inner
  &__inner {
    position: relative;
  }

  // .custom-dropdown__head
  &__head {
    position: relative;
    cursor: pointer;
  }

  .custom-input__input {
    padding-right: 50px;
  }

  // .custom-dropdown__label
  &__label {
    position: relative;
  }

  // .custom-dropdown__icon-arrow
  &__icon-arrow {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  // .custom-dropdown__icon-search
  &__icon-search {
    position: absolute;
    top: 50%;
    left: 100%;
    transition: $td;
    pointer-events: none;
    touch-action: none;
    opacity: 0;
    transform: translateX(5px) translateY(-50%);
    @include boxsize(20px);

    #{$b}--is-opened & {
      opacity: 1;
    }
  }

  // .custom-dropdown__window
  &__window {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: auto;
    max-height: 0;
    background-color: $color-main;
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: none;
    touch-action: none;
    opacity: 0;
    transition: $td;
    z-index: 3;

    #{$b}--is-opened & {
      opacity: 1;
      pointer-events: unset;
      touch-action: unset;
      margin-top: 5px;
      max-height: 200px;
      box-shadow: 0 0 15px 0 $color-primary;
      border-radius: 4px;
    }

    @include remove-scrollbar();

    // .custom-dropdown__window-item
    &-item {
      padding: 16px;
      cursor: pointer;
      color: $color-light;
      transition: $td;

      &:not(:last-child) {
        border-bottom: 1px solid $color-primary;
      }

      @include hover {
        color: $color-primary;
      }
    }

    // .custom-dropdown__window-void
    &-void {
      padding: 16px;
    }
  }
}
</style>

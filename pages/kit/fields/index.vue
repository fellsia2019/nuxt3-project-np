<template>
  <div class="kit-fields">
    <div class="container">
      <div class="kit-fields__inner">
        <div class="kit-fields__header">
          <h1 class="kit-fields__title title title-h1">
            поля формы
          </h1>
        </div>

        <div class="kit-fields__block">
          <div class="kit-fields__block-header">
            <h2 class="kit-fields__block-title title title-h2">

            </h2>
          </div>

          <div class="kit-fields__list">
            <div class="kit-fields__list-item">
              <CustomInput v-model="inputValue">
                Текст
              </CustomInput>
            </div>
            <div class="kit-fields__list-item">
              <CustomDropdown v-model="dropdownValueSearch" :options="dropdownOptions" placeholder="Список с поиском" />
            </div>
            <div class="kit-fields__list-item">
              <CustomDropdown v-model="dropdownValue" :options="dropdownOptions" :withSearch="false"/>
            </div>
          </div>
        </div>

        <div class="kit-fields__block">

          <div class="kit-fields__list">
            <TestForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IDropdownOption } from '~/types/common/CustomDropdown'

definePageMeta({
  layout: 'kit'
})

const inputValue = ref('')

const dropdownValueSearch = ref('')
const dropdownValue = ref('')

const dropdownOptions: Array<IDropdownOption> = [
  {
    id: 1,
    name: 'опция 1'
  },
  {
    id: 2,
    name: 'опция номер 2'
  },
  {
    id: 3,
    name: 'опция номер number 3 или номер  uno muno длинный опшин #3'
  },
  {
    id: 4,
    name: 'опция 4'
  },
  {
    id: 5,
    name: 'опция 5'
  },
  {
    id: 6,
    name: 'опция 6'
  },
  {
    id: 7,
    name: 'опция 7'
  },
  {
    id: 8,
    name: 'опция 8'
  },
  {
    id: 9,
    name: 'опция 9'
  },
]


</script>

<style lang="scss">
$b: '.kit-fields';

#{$b} {

  // .kit-fields__header
  &__header {
    margin-bottom: 48px;
  }

   // .kit-fields__block
   &__block {
    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-fields__block-header
    &-header {
      margin-bottom: 24px;
    }
  }

  // .kit-fields__list
  &__list {
    max-width: 600px;
    // .kit-fields__list-item
    &-item {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>

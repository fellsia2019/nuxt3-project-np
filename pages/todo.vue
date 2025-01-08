<template>
  <div class="todo-page">
    <div class="container">
      <h1 class="todo-page__title title title-h1 color-primary">
        Что ещё нужно сделать
      </h1>
      <div class="todo-page__inner title-h4">
        <div v-for="(block, i) in todoList" :key="`todo-block-${i}`">
          <h2 class="title title-h2">{{ block.title }}</h2>
          <ul >
            <li
              v-for="list in block.items"
              :key="`todo-block-list-${i}-${block.title}`"
              :class="{ '_done': list.done || (list.items?.length && list.items.every(el => el.done)) }"
              @click="toggleTodoItem(list)"
            >
              <span v-html="list.item" />
              <template v-if="list.items?.length">
                <ul>
                  <li
                    v-for="supList in list.items"
                    :class="{ '_done': supList.done }"
                    @click.stop="toggleTodoItem(supList)"
                  >
                    <span v-html="supList.item" />
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </div>

      <div class="todo-page__form">
        <select name="" id="" @change="onChangeTypeBlock">
          <option :value="TypeBlock.FRONT">Добавить в фронтенд</option>
          <option :value="TypeBlock.BACK">Добавить в бэкент</option>
        </select>
        <input v-model="form.item" type="text" placeholder="item">
        <div class="todo-page__form-items">
          <div v-for="(item, i) in form.items">
            <input :value="item.item" type="text" placeholder="item" @input="(e) => onInputFormItem(e, i)">
            <CustomButton @click="removeFormItem(i)" :size="CustomButtonSizeSettings.SM" :theme="CustomButtonThemeSettings.PRIMARY_OUTLINE">
              X
            </CustomButton>
          </div>
        </div>
        <CustomButton @click="addFormItem" :size="CustomButtonSizeSettings.SM" :theme="CustomButtonThemeSettings.PRIMARY_OUTLINE">
          Добавить айтем
        </CustomButton>
        <CustomButton @click="createTodo">
          Добавить тудушку в {{ form.type === TypeBlock.FRONT ? 'Фронтенд' : 'Бэкенд' }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonThemeSettings } from '~/types/common/CustomButton';

enum TypeBlock {
  FRONT = 'FRONT',
  BACK = 'BACK'
}

const todoList = ref([
  {
    title: 'Фронт',
    items: [
      {
        item: 'middelware',
        done: false,
        items: []
      },
      {
        item: 'нормальный login/registaration',
        done: false,
        items: []
      },
      {
        item: 'личный кабинет',
        done: false,
        items: [
          {
            item: 'редактирование формы юзера',
            done: false,
            items: []
          },
          {
            item: 'добавление проектов',
            done: false,
            items: []
          },
          {
            item: 'редактирование собственных проектов',
            done: false,
            items: []
          }
        ]
      },
      {
        item: 'блоки на главной',
        done: false,
        items: [
          {
            item: 'новости',
            done: false,
            items: []
          },
          {
            item: 'инициативы',
            done: false,
            items: []
          }
        ]
      },
      {
        item: 'страницы',
        done: false,
        items: [
          {
            item: 'проекты',
            done: false,
            items: []
          },
          {
            item: 'статьи',
            done: false,
            items: []
          },
          {
            item: 'инициативы',
            done: false,
            items: []
          }
        ]
      },
      {
        item: 'футер',
        done: false,
        items: []
      },
      {
        item: 'нотификайки',
        done: false,
        items: [
          {
            item: 'создать глобальные нотифайки',
            done: false,
            items: []
          },
          {
            item: 'добавить нотифайти в сторах',
            done: false,
            items: []
          },
          {
            item: 'нотифайки с анимацией',
            done: false,
            items: []
          }
        ]
      }
    ]
  },
  {
    title: 'Бэк',
    items: [
      {
        item: 'визуальный редактор',
        done: false,
        items: []
      },
      {
        item: 'картинки для деталок, с webp, оптимизировать код',
        done: false,
        items: []
      }
    ]
  }
])

function toggleTodoItem(list: { item: string; done: boolean; items: Array<any> }) {
  const currentDoneState = list.done || (list.items?.length && list.items?.every(item => item.done))
  list.done = !currentDoneState

  if (list.items?.length) {
    list.items.forEach(item => item.done = list.done)
  }

  saveTodoListInLC()
}

function saveTodoListInLC() {
  window.localStorage.setItem('_todo_list_', JSON.stringify(todoList.value))
}

onMounted(() => {
  const todoListFromLC = window.localStorage.getItem('_todo_list_')

  if (todoListFromLC) {
    todoList.value = JSON.parse(todoListFromLC)
  }
})

const form = ref({...{ item: '', done: false, items: [ { item: '', done: false, items: [] } ] }, type: TypeBlock.FRONT })

function onInputFormItem(e: Event, i: number) {
  // const formItem = form.value?.[i]
  if (!form.value?.items?.length || !(e.target instanceof HTMLInputElement)) {
    return
  }

  form.value.items[i].item = e.target.value
}

function addFormItem() {
  form.value.items.push({ item: '', done: false, items: [] })
}

function removeFormItem(i: number) {
  form.value.items = [...form.value.items.slice(0, i), ...form.value.items.slice(i + 1)]
}

function onChangeTypeBlock(e: Event) {
  if (!(e.target instanceof HTMLSelectElement)) {
    return
  }

  form.value.type = TypeBlock[e.target.value as TypeBlock]
}

function createTodo() {
  if (!form.value.item?.trim()) {
    return
  }

  const index = form.value.type === TypeBlock.FRONT ? 0 : 1
  console.log('form.value.items', form.value.items)
  todoList.value[index].items.push({ item: form.value.item, done: false, items: [ ...form.value.items ] })

  // clear
  form.value = {...{ item: '', done: false, items: [ { item: '', done: false, items: [] } ] }, type: TypeBlock.FRONT }

  saveTodoListInLC()
}

</script>

<style lang="scss">
$b: '.todo-page';

#{$b} {

  // .todo-page__title
  &__title {
    margin-bottom: 32px;
  }

  // .todo-page__inner
  &__inner {
    display: flex;
    gap: 32px;
    padding: 80px;
    border-radius: 24px;
    box-shadow: 0 0 15px 0 rgba($color-primary, 0.5);

    & > * {
      flex: 1 0;
    }

    ul {
      padding: 10px 0;
      li {
        position: relative;
        padding: 12px 12px 12px 28px;
        cursor: pointer;
        &:hover {
          &::after {
            opacity: 1;
          }
        }
        &::after {
          content: '';
          position: absolute;
          left: -5px;
          top: -5px;
          width: calc(100% + 10px);
          height: calc(100% + 10px);
          background-color: rgba($color-primary, 0.1);
          border-radius: 12px;
          transition: $td;
          opacity: 0;
          pointer-events: none;
          touch-action: none;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $color-primary;
        }

        &._done {
          & > span {
            text-decoration: line-through;
            opacity: 0.5;
          }
          &::before {
            background-color: $color-success;
          }
        }
      }
    }
  }

  // .todo-page__form
  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid $color-primary;
    margin-top: 30px;
    margin-bottom: 30px;

    input, select {
      width: 400px;
      height: 40px;
      padding: 5px 20px;
      border: 1px solid $color-primary;
    }

    select {
      background-color: $color-main;
    }

    // .todo-page__form-items
    &-items {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-left: 50px;
      border-left: 1px solid $color-primary;

      & > * {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      input {
        width: auto;
      }
    }
  }
}
</style>

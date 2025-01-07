<template>
  <div class="todo-page">
    <div class="container">
      <h1 class="todo-page__title title title-h1 color-primary">
        Что ещё нужно сделать
      </h1>
      <div class="todo-page__inner title-h4">
        <div>
          <h2 class="title title-h2">Фронт</h2>
          <ul>
            <li>
              middelware
            </li>
            <li>
              нормальный login/registaration
            </li>
            <li>
              личный кабинет
              <ul>
                <li>
                  редактирование формы юзера
                </li>
                <li>
                  добавление проектов
                </li>
                <li>
                  редактирование собственных проектов
                </li>
              </ul>
            </li>
            <li>
              блоки на главной:
              <ul>
                <li>
                  новости
                </li>
                <li>
                  инициативы
                </li>
              </ul>
            </li>
            <li>
              страницы:
              <ul>
                <li>
                  проекты
                </li>
                <li>
                  новости
                </li>
                <li>
                  инициативы
                </li>
              </ul>
            </li>
            <li>
              футер
            </li>
            <li>
              нотификайки - можно спереть мои с обрф
            </li>
          </ul>
        </div>
        <div>
          <h2 class="title title-h2">Бэк</h2>
          <ul>
            <li>
              визуальный редактор
            </li>
            <li>
              картинки для деталок, с webp, оптимизировать код
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

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
      }
    }
  }
}
</style>

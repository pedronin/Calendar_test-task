<script setup>
import { reactive, computed } from "vue";
import getDaysMonth from "@/utils/getDaysMonth";

const props = defineProps({
  value: {
    type: [String, Date],
    default: new Date(),
  },
});

const emits = defineEmits(["change:date"]);

const monthDays = computed(() => {
  return getDaysMonth(state.year, state.month);
});

const parsedValue = computed(() => {
  return typeof props.value === "string" ? new Date(props.value) : props.value;
});

const state = reactive({
  year: parsedValue.value.getFullYear(),
  month: parsedValue.value.getMonth(),
  day: parsedValue.value.getDate(),
});

const changeMonth = (direction) => {
  if (direction === "next") {
    state.month++;
  } else {
    state.month--;
  }

  if (state.month > 11) {
    state.month = 0;
    state.year++;
  } else if (state.month < 0) {
    state.month = 11;
    state.year--;
  }
};

const changeDate = (date) => {
  emits("change:date", new Date(date.year, date.month, date.day));
};
</script>

<template>
  <div class="calendar">
    <div class="calendar__header">
      <button
        class="calendar__header-arrow --left"
        @click="changeMonth('prev')"
      >
        <img src="/icons/chevron-right.svg" alt="<" />
      </button>

      <div class="calendar__header-title">
        <!-- В идеале селект использовать из библиотеки, но здесь я представил самый минималистичный самописный вариант -->
        <select
          class="calendar__header-select"
          name="months"
          id="month-select"
          v-model="state.month"
        >
          <option v-for="(month, i) in $tm('months')" :value="i" :key="month">
            {{ month }}
          </option>
        </select>

        <select
          class="calendar__header-select"
          name="years"
          id="years-select"
          v-model="state.year"
        >
          <option v-for="(, i) in 50" :value="i + 1990" :key="i + 1990">
            {{ i + 1990 }}
          </option>
        </select>
      </div>

      <button class="calendar__header-arrow" @click="changeMonth('next')">
        <img src="/icons/chevron-right.svg" alt=">" />
      </button>
    </div>

    <div class="calendar__content">
      <div
        class="calendar__content-wday"
        v-for="weekDay in $tm('weekDays')"
        :key="weekDay"
      >
        {{ weekDay }}
      </div>

      <button
        v-for="date in monthDays"
        class="calendar__content-day"
        :class="{
          '--more-month': date.month !== state.month,
          '--active':
            date.day === parsedValue.getDate() &&
            date.month === parsedValue.getMonth() &&
            date.year === parsedValue.getFullYear(),
        }"
        :key="`${date.month}-${date.day}`"
        @click="changeDate(date)"
      >
        {{ date.day }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 502px;
  margin: 0 auto;
  padding: 30px;

  border-radius: 16px;
  background-color: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 46px;
      height: 46px;

      &.--left {
        transform: rotate(180deg);
      }

      &:hover {
        background-color: #e9f0f5;
      }
    }

    &-title {
      display: flex;
      gap: 8px;
    }

    &-select {
      font-size: 20px;
      font-weight: 800;

      cursor: pointer;
      border: none;
      appearance: none;
      outline: none;

      &:hover {
        color: #535353;
      }
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 64px;

    &-day,
    &-wday {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-wday {
      font-weight: 600;
    }

    &-day {
      border: 1px solid #d5d4df;

      &:hover {
        background-color: #e9f0f5;
      }

      &.--more-month {
        color: #a8a8a8;
        background-color: #f1f1f1;
      }

      &.--active {
        color: #fff;
        background-color: #45539d;
      }
    }
  }
}
</style>

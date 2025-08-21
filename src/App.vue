<script setup>
import { ref } from "vue";
import Calendar from "./components/Calendar";
import LanguageChange from "./components/LanguageChange";

const dateValue = ref(new Date());

const onChangeDate = (date) => {
  dateValue.value = date;
  console.log("Date changed:", dateValue.value.toDateString());
};
</script>

<template>
  <Calendar :value="dateValue" @change:date="onChangeDate" />

  <LanguageChange />
</template>

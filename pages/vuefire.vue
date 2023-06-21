<script setup>
import { useDatabaseList } from "vuefire";
import { ref as dbRef } from "firebase/database";

const db = useDatabase();
const foods = useDatabaseList(dbRef(db, "foods"));
const someFoods = useDatabaseObject(dbRef(db, "foods", "1"));
</script>

<template>
  <ul>
    <li v-for="todo in foods" :key="todo.id">
      <span>{{ todo }}</span>
    </li>
  </ul>
  <p>{{ someFoods }}</p>
</template>

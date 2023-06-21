<template>
  <div>
    <h2>Input User</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="name" placeholder="Input Name" required />
      <input type="email" v-model="email" placeholder="Input Email" required />
      <button>Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  getDatabase,
  ref as firebaseRef,
  set,
  onValue,
} from "@firebase/database";
import { v4 as vuidv4 } from "uuid";

const name = ref("");
const email = ref("");
const db = getDatabase();
const user = useCurrentUser();

const handleSubmit = () => {
  writeUserData(
    vuidv4(),
    name.value,
    email.value,
    user?.value?.displayName || "",
    user?.value?.email || ""
  ).then(() => {
    name.value = "";
    email.value = "";
  });
};

function writeUserData(
  userId: string,
  name: string,
  email: string,
  author: string,
  author_email: string
) {
  return set(firebaseRef(db, "users/" + userId), {
    username: name,
    email: email,
    author,
    author_email,
  });
}
</script>

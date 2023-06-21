<template>
  <h1>{{ user?.displayName }}</h1>
  <h3>{{ user?.email }}</h3>
  <table border="1" style="width: 50%">
    <colgroup>
      <col style="width: 25%" />
      <col style="width: 25%" />
      <col style="width: 25%" />
      <col style="width: 25%" />
      <col style="width: 25%" />
    </colgroup>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Author</th>
        <th>Author Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in myUser" :key="index">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.author }}</td>
        <td>{{ user.author_email }}</td>
        <td>
          <button title="Edit" @click="handleEdit(user)">Edit</button>
          <button title="Delete" @click="handleDelete(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <div v-if="isEdit">
    <h2>Edit User</h2>
    <form @submit.prevent="handleSubmitEdit">
      <input type="text" v-model="name" placeholder="Input Name" required />
      <input type="text" v-model="email" placeholder="Input Email" required />
      <button>Submit</button>
    </form>
  </div>
</template>

<script setup>
import {
  getDatabase,
  ref as firebaseRef,
  set,
  onValue,
  update,
  remove,
} from "@firebase/database";
// import firebase from "@/firebase";

definePageMeta({ middleware: "login" });

const user = useCurrentUser();

const db = getDatabase();
const myUser = ref([]);

const idEdit = ref("");
const name = ref("");
const email = ref("");
const isEdit = ref(false);

onMounted(() => {
  getUserData();
});

function getUserData() {
  const users = firebaseRef(db, "users");
  onValue(users, (snapshot) => {
    const data = snapshot.val();
    const result =
      data &&
      Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });
    myUser.value = result;
  });
}

const handleEdit = (user) => {
  idEdit.value = user.id;
  name.value = user.username;
  email.value = user.email;
  isEdit.value = true;
};

const handleSubmitEdit = () => {
  update(firebaseRef(db, "users/" + idEdit.value), {
    username: name.value,
    email: email.value,
  }).then(() => {
    idEdit.value = "";
    name.value = "";
    email.value = "";
    isEdit.value = false;
  });
};

const handleDelete = (id) => {
  remove(firebaseRef(db, "users/" + id));
};
</script>

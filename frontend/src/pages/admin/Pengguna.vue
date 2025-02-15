<template>
  <h1 class="text-xl font-medium mr-auto">Kelola Pengguna</h1>
  <p class="text-gray-700 text-sm mt-1 mb-4">
    Kelola data dan keamanan akun pengguna
  </p>
  <div class="w-full flex justify-between items-center flex-wrap gap-4 mb-4">
    <h3 class="text-sm font-medium">Total Pengguna (15)</h3>
    <InputSearch placeholder="Cari Pengguna" />
  </div>
  <div
    class="w-full overflow-x-auto min-h-[calc(100vh-290px)] rounded-md border border-md"
  >
    <table class="w-full">
      <thead>
        <tr class="border-b bg-blue-500 text-white">
          <th class="w-10 px-4 truncate">
            <input
              type="checkbox"
              class="w-4 h-4 mx-auto text-blue-600 bg-gray-100 border-white rounded-sm focus:ring-blue-500"
            />
          </th>
          <th class="text-left px-4 py-2 text-base font-medium truncate">
            Nama
          </th>
          <th class="sr-only w-8 ml-auto">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="user in users" :key="user.id">
          <td class="w-10">
            <input
              type="checkbox"
              class="w-4 h-4 block mx-auto text-blue-600 bg-gray-100 border-blue-600 rounded-sm focus:ring-blue-500"
            />
          </td>
          <td class="px-4 py-2 text-sm truncate">{{ user.name }}</td>
          <td class="px-4 text-sm relative">
            <button
              :id="user.id"
              @click="openAction = openAction === user.id ? '' : user.id"
            >
              <EllipsisVertical class="w-5 h-10 text-gray-500" />
            </button>
            <ActionTable
              :value="user.id"
              :openAction="openAction"
              @update="openAction = ''"
            >
              <button class="btn-danger">Hapus</button>
            </ActionTable>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EllipsisVertical } from "lucide-vue-next";
import InputSearch from "../../components/ui/InputSearch.vue";
import ActionTable from "../../components/fragments/ActionTable.vue";

const users = ref([
  { id: "user1", name: "John Doe" },
  { id: "user2", name: "Jane Doe" },
]);

const openAction = ref("");
</script>

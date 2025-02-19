<template>
  <section>
    <h1 class="text-xl font-medium mr-auto">Kelola Buku</h1>
    <p class="text-gray-700 text-sm mt-1 mb-4">kelola data buku perpustakaan</p>
    <div class="w-full flex justify-between items-center flex-wrap gap-4 mb-4">
      <h3 class="text-sm font-medium">
        Total buku ({{ data?.data?.pagination?.total || 0 }})
      </h3>
      <div class="flex items-center gap-2 w-full md:w-fit">
        <InputSearch placeholder="Cari Pengguna" />
        <button
          @click="
            () => {
              openDelete = true;
            }
          "
          :disabled="isLoading || selected.length === 0"
          class="p-2 rounded-md flex items-center disabled:cursor-not-allowed disabled:text-white text-red-600 disabled:bg-gray-300 bg-white border disabled:border-gray-300 border-red-600 justify-center text-sm"
        >
          <Trash class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div
      class="w-full overflow-x-auto min-h-[calc(100vh-280px)] rounded-md border border-md"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b bg-blue-600 text-white">
            <th class="w-10 px-4 truncate">
              <input
                :disabled="isLoading"
                type="checkbox"
                class="w-4 h-4 mx-auto text-blue-600 bg-gray-100 border-white rounded-sm focus:ring-blue-500"
                :checked="
                  selected.length === data?.data?.length &&
                  data?.data?.length > 0
                "
                @change="toggleselected"
              />
            </th>
            <th class="text-left px-4 py-2 text-sm font-medium truncate">
              Email
            </th>
            <th class="text-left px-4 py-2 text-sm font-medium truncate">
              Nama
            </th>
            <th class="text-left px-4 py-2 text-sm font-medium truncate">
              Gender
            </th>

            <th class="sr-only w-8 ml-auto">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data?.data?.user.length === 0">
            <td colspan="100%" class="text-center text-sm py-4">No Data.</td>
          </tr>
          <tr
            v-if="!isLoading && data?.data?.user?.length > 0"
            class="border-b"
            v-for="user in data.data.user"
            :key="user.id"
          >
            <td class="w-10">
              <input
                :checked="selected.includes(user.id)"
                @change="toggleSelect(user.id)"
                type="checkbox"
                class="w-4 h-4 block mx-auto text-blue-600 bg-gray-100 border-blue-600 rounded-sm focus:ring-blue-500"
              />
            </td>
            <td class="px-4 py-2 text-sm truncate">{{ user?.email }}</td>

            <td class="px-4 py-2 text-sm truncate">{{ user?.name }}</td>
            <td class="px-4 py-2 text-sm truncate">
              {{ user?.gender || "-" }}
            </td>

            <td class="px-4 text-sm relative">
              <button
                :id="user?.id || ''"
                @click="
                  openAction = openAction === user.id ? '' : user?.id || ''
                "
              >
                <EllipsisVertical class="w-5 h-10 text-gray-500" />
              </button>
              <ActionTable
                :value="user?.id || '1'"
                :openAction="openAction"
                @update="openAction = ''"
              >
                <button
                  @click="handleEdit(user)"
                  class="px-2 py-1 text-sm truncate w-full"
                >
                  Edit
                </button>
              </ActionTable>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FooterTable
      :total="data?.data?.pagination.total"
      :page="data?.data?.pagination.page"
      :total-page="data?.data?.pagination.totalPage"
    />
  </section>
  <ModalDelete
    @confirm="handleDelete"
    :title="'pengguna'"
    :isOpen="openDelete"
    @close="openDelete = false"
  />
  <ModalEditPengguna
    :isOpen="openEdit"
    @close="openEdit = false"
    :data="dataEdit || null"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EllipsisVertical, Trash } from "lucide-vue-next";
import InputSearch from "../../../components/ui/InputSearch.vue";
import ActionTable from "../../../components/fragments/ActionTable.vue";
import { type BookType, type UserType } from "../../../types/model";
import ModalDelete from "../../../components/fragments/ModalDelete.vue";
import useDeleteBook from "../../../composables/book/useDeleteBook";
import FooterTable from "../../../components/fragments/FooterTable.vue";
import useGetAllUser from "../../../composables/user/useGetAllUser";
import ModalEditPengguna from "./ModalEditPengguna.vue";
import useDeleteUser from "../../../composables/user/useDeleteUser";

const selected = ref<string[]>([]);
const openDelete = ref(false);
const dataEdit = ref<UserType | null>(null);
const openEdit = ref(false);

const openAction = ref("");

const { data, isLoading } = useGetAllUser();
const { mutate } = useDeleteUser();

const handleEdit = (value: UserType) => {
  openEdit.value = true;
  dataEdit.value = value;
  openAction.value = "";
};

const toggleselected = (event: Event) => {
  if ((event.target as HTMLInputElement).checked) {
    selected.value =
      data.value?.data.user.map((item: BookType) => item.id) || [];
  } else {
    selected.value = [];
  }
};

const toggleSelect = (id: string) => {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((item: string) => item !== id);
  } else {
    selected.value = [...selected.value, id];
  }
};

const handleDelete = () => {
  mutate(selected.value, {
    onSuccess: () => {
      selected.value = [];
      openDelete.value = false;
    },
  });
};
</script>

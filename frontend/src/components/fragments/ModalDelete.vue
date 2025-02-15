<template>
  <Modal :isOpen="isOpen" @close="handleClose">
    <div class="w-full flex justify-center items-center h-full flex-col">
      <AlertTriangle class="w-12 h-12 text-red-500 stroke-[1.5]" />
      <h1 class="text-lg font-medium mt-4">Konfirmasi Hapus</h1>
      <p class="text-sm mt-2">Apakah anda yakin ingin menghapus {{ title }}</p>
    </div>
    <div class="py-4 flex iems-center justify-center gap-4">
      <button
        @click="handleClose"
        class="px-8 py-1.5 rounded-md border border-gray-500 active:bg-gray-200"
      >
        Batal
      </button>
      <button
        class="px-8 py-1.5 rounded-md bg-red-500 text-white"
        @click="onConfirm"
      >
        Hapus
      </button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { AlertTriangle } from "lucide-vue-next";
import Modal from "../ui/Modal.vue";

defineProps<{ isOpen: boolean; title: string }>();

const emit = defineEmits(["close", "confirm"]);

const onConfirm = () => emit("confirm");

const handleClose = () => {
  emit("close");
};
</script>

<style></style>

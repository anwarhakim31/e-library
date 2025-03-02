<template>
  <Modal :isOpen="isOpen" @close="handleClose">
    <div class="w-full flex justify-center items-center h-full flex-col">
      <AlertTriangle class="w-12 h-12 text-blue-600 stroke-[1.5]" />
      <h1 class="text-lg font-medium mt-4">Konfirmasi Booking</h1>
      <p class="text-sm mt-2">
        Apakah anda yakin ingin menyetujui booking ini untuk dipinjam?
      </p>
    </div>
    <div class="py-4 flex iems-center justify-center gap-4">
      <button
        @click="handleClose"
        class="px-8 py-1.5 rounded-md border border-gray-500 active:bg-gray-200"
      >
        Tidak
      </button>
      <button
        class="px-8 py-1.5 rounded-md bg-blue-600 text-white"
        @click="onConfirm"
      >
        Ya
      </button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { AlertTriangle } from "lucide-vue-next";
import Modal from "../../../components/ui/Modal.vue";

defineProps<{ isOpen: boolean }>();

const emit = defineEmits(["close", "confirm"]);

const onConfirm = () => emit("confirm");

const handleClose = () => {
  emit("close");
};
</script>

<style></style>

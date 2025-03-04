<template>
  <Modal :isOpen="isOpen" @close="handleClose">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Edit Status Pinjaman</h3>

      <button @click="handleClose" class="border bg-gray-100 p-1.5 rounded-md">
        <X class="w-5 h-5 text-gray-500 active:text-gray-400" />
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="mt-4">
      <SelectFormControl
        label="Status Peminjaman"
        id="status"
        placeholder="Status Peminjaman"
        :data="[
          { id: 'konfirmasi', name: 'konfirmasi' },
          { id: 'dipinjam', name: 'dipinjam' },
          { id: 'dikembalikan', name: 'dikembalikan' },
        ]"
      />
      <button class="btn-primary w-full mt-6 text-sm py-2.5 px-4">
        {{ isPending ? "Loading..." : "Simpan" }}
      </button>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
import { X } from "lucide-vue-next";
import Modal from "../../../components/ui/Modal.vue";
import type { BookingType } from "../../../types/model";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import SelectFormControl from "../../../components/ui/SelectFormControl.vue";

import { watch } from "vue";
import { useChangeStatusBorrow } from "../../../composables/borrow/useChangeStatusBorrow";

const props = defineProps<{ isOpen: boolean; data: BookingType | null }>();

const emit = defineEmits(["close"]);

const schema = toTypedSchema(
  z.object({
    id: z.string().nonempty("ID tidak boleh kosong"),
    status: z.string().nonempty("Status tidak boleh kosong"),
  })
);

const form = useForm({
  validationSchema: schema,
  initialValues: {
    id: "",
    status: "",
  },
});

const { mutate, isPending } = useChangeStatusBorrow();

watch(props, () => {
  if (props?.data) {
    form.setValues({
      id: props.data?.id || "",
      status: props.data?.status || "",
    });
  }
});

const onSubmit = form.handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => {
      emit("close");
    },
  });
});

const handleClose = () => {
  emit("close");
};
</script>

<style></style>

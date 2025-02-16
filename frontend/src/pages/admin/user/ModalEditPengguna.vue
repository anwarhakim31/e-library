<template>
  <Modal :isOpen="isOpen" @close="handleClose">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Edit Pengguna</h3>
      <button @click="handleClose" class="border bg-gray-100 p-1.5 rounded-md">
        <X class="w-5 h-5 text-gray-500 active:text-gray-400" />
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="mt-4">
      <BaseFormControl name="Nama" type="text" id="name" placeholder="Nama" />
      <BaseFormControl
        name="Email"
        type="email"
        id="email"
        placeholder="Email"
      />
      <SelectFormControl
        label="Jenis Kelamin"
        id="gender"
        placeholder="Jenis Kelamin"
        :data="[
          { id: 'Laki-Laki', name: 'Laki-Laki' },
          { id: 'Perempuan', name: 'Perempuan' },
        ]"
      />
      <BaseFormControl
        name="Password"
        type="password"
        id="password"
        placeholder="Password"
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
import type { UserType } from "../../../types/model";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import BaseFormControl from "../../../components/ui/BaseFormControl.vue";
import SelectFormControl from "../../../components/ui/SelectFormControl.vue";
import usePutUser from "../../../composables/user/usePutUser";
import { watch } from "vue";

const props = defineProps<{ isOpen: boolean; data: UserType | null }>();

const emit = defineEmits(["close"]);

const schema = toTypedSchema(
  z.object({
    id: z.string().nonempty("ID tidak boleh kosong"),
    name: z.string().nonempty("Nama tidak boleh kosong"),
    email: z.string().nonempty("Email tidak boleh kosong"),
    gender: z.string().nonempty("Jenis kelamin tidak boleh kosong"),
    password: z.string().optional(),
  })
);

const form = useForm({
  validationSchema: schema,
  initialValues: {
    id: "",
    name: "",
    email: "",
    gender: "",
    password: "",
  },
});

const { mutate, isPending } = usePutUser();

watch(props, () => {
  if (props?.data) {
    form.setValues({
      id: props.data?.id || "",
      name: props.data?.name || "",
      email: props.data?.email || "",
      gender: props.data?.gender || "",
      password: "",
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

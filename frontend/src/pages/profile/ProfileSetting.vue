<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 lg:mt-0 mt-10">
    <div class="col-span-1 flex flex-col items-center">
      <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="relative w-28 h-28 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-500 overflow-hidden flex justify-center items-center"
      >
        <div v-if="imagePreview" class="rounded-full bg-blue-500">
          <img :src="imagePreview" alt="Bordered avatar" />
        </div>
        <div
          v-else
          class="p-1 flex items-center justify-center rounded-full bg-blue-500"
        >
          <span class="text-2xl uppercase text-white">
            {{ ProfileName(auth.user?.name || "") }}
          </span>
        </div>
        <input
          @change="handleFileChange"
          accept="image/*"
          ref="imageInput"
          type="file"
          class="hidden"
        />
        <div
          @click="
            () => {
              imagePreview = '';
              form.setFieldValue('photo', '');
            }
          "
          class="absolute flex items-center justify-center inset-0 z-10 bg-black/50"
          v-if="isHover && imagePreview"
        >
          <X class="w-8 text-white stroke-[1.5] h-8 inline-block" />
        </div>
        <div
          @click="triggerFileInput"
          class="absolute flex items-center justify-center inset-0 z-10 bg-black/50"
          v-if="isHover && !imagePreview"
        >
          <Plus class="w-8 text-white stroke-[1.5] h-8 inline-block" />
        </div>
        <div
          v-if="setProggress > 0"
          class="absolute flex items-center justify-center inset-0 z-10 bg-black/50"
        >
          <p class="text-basr text-white">{{ setProggress }}%</p>
        </div>
      </div>
      <span class="text-xs mt-2 text-gray-500">
        Maksimal ukuran gambar 5MB
      </span>
    </div>

    <form @submit.prevent="onSubmit" class="col-span-2">
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
      <BaseFormControl name="Password" type="password" id="password" />
      <button
        type="submit"
        :disabled="isPending || isPendingUser"
        class="btn-primary mt-8 text-sm w-full py-2.5"
      >
        Simpan
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import BaseFormControl from "../../components/ui/BaseFormControl.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "../../stores/auth";
import { ref, watchEffect } from "vue";
import SelectFormControl from "../../components/ui/SelectFormControl.vue";
import { ProfileName } from "../../utils/helpers";
import { Plus, X } from "lucide-vue-next";
import useEditProfile from "../../composables/auth/useEditProfile";
import usePostImage from "../../composables/image/usePostImage";
import type { UserType } from "../../types/model";

const isHover = ref(false);
const setProggress = ref(0);
const imagePreview = ref<string | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const { mutate, isPending } = usePostImage(
  (value) => (setProggress.value = value)
);
const { mutate: mutateUser, isPending: isPendingUser } = useEditProfile();

const schema = toTypedSchema(
  z.object({
    name: z.string().nonempty("Nama tidak boleh kosong"),
    email: z
      .string()
      .email("Email tidak valid")
      .nonempty("Email tidak boleh kosong"),
    photo: z.string().optional(),
    gender: z.string().nonempty("Jenis Kelamin tidak boleh kosong"),
    password: z.string().optional(),
  })
);

const auth = useAuthStore();

const form = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    email: "",
    gender: "",
    photo: "",
    password: "",
  },
});

const onSubmit = form.handleSubmit((values) => {
  mutateUser(values, {
    onSuccess(value: { data: UserType }) {
      auth.user = {
        ...auth.user,
        ...value.data,
      };
    },
  });
});

watchEffect(() => {
  form.setFieldValue("name", auth.user?.name || "");
  form.setFieldValue("email", auth.user?.email || "");
  form.setFieldValue("gender", auth.user?.gender || "");
  form.setFieldValue("photo", auth.user?.photo || "");

  if (auth.user?.photo) {
    imagePreview.value = auth.user?.photo;
  }
});

const triggerFileInput = () => {
  if (imageInput.value) {
    imageInput.value?.click();
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files[0].size > 1024 * 1024 * 5) {
    target.value = "";
  }

  if (target.files?.length) {
    mutate(target.files[0], {
      onSuccess(value) {
        imagePreview.value = value?.url;
        form.setFieldValue("photo", value?.url);
        target.value = "";
        setProggress.value = 0;
      },
      onError() {
        target.value = "";
        setProggress.value = 0;
      },
    });
  }
};
</script>

<style></style>

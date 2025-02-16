<template>
  <section>
    <RouterLink
      to="/admin/buku"
      class="flex w-fit items-center text-sm mb-4 btn-primary"
    >
      <ChevronLeft class="w-5 h-5" />
      Kembali
    </RouterLink>
    <h1 class="text-xl font-medium mr-auto">Tambah Buku</h1>
    <form class="mt-6 w-full" @submit.prevent="onSubmit">
      <BaseFormControl name="ISBN" type="text" id="isbn" placeholder="ISBN" />
      <BaseFormControl
        name="Judul"
        type="text"
        id="title"
        placeholder="Judul"
      />
      <BaseFormControl
        name="Penulis"
        type="text"
        id="author"
        placeholder="Penulis"
      />
      <ImageFormControl
        @uploading="handleUploading"
        name="Cover Buku"
        id="coverImage"
        placeholder="Gambar"
      />
      <BaseFormControl
        name="Stok"
        type="number"
        id="stock"
        placeholder="Stok"
      />
      <AreaFormControl
        name="Deskripsi"
        id="description"
        placeholder="Deskripsi"
      />
      <button
        :disabled="isUploading || isPending"
        class="btn-primary block ml-auto w-fit mt-6 text-sm py-2.5 px-4"
      >
        {{ isUploading || isPending ? "Loading.." : "Tambah Buku" }}
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import BaseFormControl from "../../../components/ui/BaseFormControl.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import ImageFormControl from "../../../components/ui/ImageFormControl.vue";
import { RouterLink } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";
import { ref } from "vue";
import AreaFormControl from "../../../components/ui/AreaFormControl.vue";
import usePostBook from "../../../composables/book/usePostBook";

const schema = toTypedSchema(
  z.object({
    isbn: z.string().nonempty("ISBN tidak boleh kosong"),
    title: z.string().nonempty("Judul tidak boleh kosong"),
    author: z.string().nonempty("Penulis tidak boleh kosong"),
    coverImage: z.string().nonempty("Cover buku tidak boleh kosong"),
    stock: z.number().min(0, "Stok tidak boleh negatif"),
    description: z.string().nonempty("Deskripsi tidak boleh kosong"),
  })
);

const form = useForm({
  validationSchema: schema,
  initialValues: {
    isbn: "",
    title: "",
    author: "",
    coverImage: "",
    stock: 1,
    description: "",
  },
});

const isUploading = ref(false);

const handleUploading = (status: boolean) => {
  isUploading.value = status;
};

const { mutate, isPending } = usePostBook();

const onSubmit = form.handleSubmit((values) => {
  mutate(values);
});
</script>

<style></style>

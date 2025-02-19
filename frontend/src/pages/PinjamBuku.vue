<template>
  <section class="container my-10">
    <div v-if="isPending" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="col-span-1 px-24 lg:px-32">
        <div class="relative w-full aspect-[2/3] bg-gray-200 animate-pulse"></div>
      </div>
      <div class="py-2 col-span-1">
        <h1
          class="text-xl text-transparent bg-gray-200 animate-pulse lg:text-3xl font-medium"
        >
          sadasdasdas
        </h1>
        <h3 class="text-sm mt-2 line-clamp-2 text-transparent bg-gray-200 animate-pulse">
          ssdsdsds
        </h3>
        <p class="text-sm bg-gray-200 animate-pulse mt-10 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-sm bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-sm bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-sm bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <div class="mt-8">
          <div class="flex gap-2 items-center">
            <span
              class="w-[100px] inline-block text-sm bg-gray-200 animate-pulse text-transparent"
              >status</span
            >
            <p class="text-sm bg-gray-200 animate-pulse text-transparent">sdasdas</p>
          </div>

          <div class="flex gap-2 items-center mt-4">
            <span
              class="w-[100px] inline-block text-sm bg-gray-200 animate-pulse text-transparent"
              >status</span
            >
            <p class="text-sm bg-gray-200 animate-pulse text-transparent">sdasdas</p>
          </div>
        </div>
        <button
          class="bg-gray-200 text-transparent animate-pulse w-[200px] mt-16 rounded-full text-sm py-2.5"
        >
          Pinjam
        </button>
      </div>
    </div>
    <div v-if="!isPending" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="col-span-1">
        <figure class="px-24 lg:px-10 xl:px-20">
          <img
            :src="data?.data?.coverImage"
            :alt="data?.data?.title"
            class="w-full h-full shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
          />
        </figure>
        <div class="mt-10">
          <h1 class="text-xl lg:text-base font-medium">
            {{ data?.data?.title }}
          </h1>
          <h3 class="text-gray-700 mt-1 text-sm">{{ data?.data?.author }}</h3>
          <p class="text-sm mt-1 text-gray-700">{{ data?.data?.isbn }}</p>
        </div>
      </div>
      <form @submit.prevent="onSubmit" class="col-span-2">
        <DateFormControl name="Tanggal Pinjam" id="date" />
        <AreaFormControl
          name="Catatan (opsional)"
          id="note"
          placeholder="Catatan"
          :style="'bg-white'"
        />
        <ul class="mt-10 bg-blue-100 p-4">
          <li class="text-sm font-light">
            <strong>Ketentuan Peminjaman:</strong>
          </li>
          <li class="text-sm font-light">
            1. Buku harus dikembalikan sesuai tanggal jatuh tempo
          </li>
          <li class="text-sm font-light">2. Denda keterlambatan Rp 2.000 per hari</li>
          <li class="text-sm font-light">
            3. Pengguna bertanggung jawab atas kerusakan atau kehilangan buku
          </li>
          <li class="text-sm font-light">
            4. Peminjaman dapat diperpanjang maksimal 1 kali
          </li>
        </ul>

        <div class="flex items-center mt-10">
          <input
            v-model="term"
            @change="handleCheck"
            type="checkbox"
            name="terms"
            id="terms"
            :class="{ 'border-red-500': errorTerm }"
            class="mr-2 border-blue-500"
          />
          <label for="terms" class="text-sm" :class="{ 'text-red-500': errorTerm }"
            >Saya setuju dengan persyaratan peminjaman buku</label
          >
        </div>

        <button
          :disabled="isPendingCreate"
          class="btn-primary w-full mt-4 :disabled:bg-blue-300 text-sm py-3"
        >
          {{ isPendingCreate ? "Loading..." : "Pinjam" }}
        </button>
      </form>
    </div>
    <Modal :isOpen="showModal" @close="showModal = false"
      ><div class="flex items-center justify-center flex-col p-4">
        <Check
          class="w-12 h-12 p-2 border-4 stroke-[2.5] border-green-500 text-green-500 rounded-full"
        />
        <h1 class="text-lg font-medium mt-4">Permintaan Peminjaman Berhasil</h1>
        <p class="text-sm text-center">
          Permintaan peminjaman Anda telah berhasil dicatat dalam sistem.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-blue-800 font-medium mb-2 text-center block">
            Langkah selanjutnya:
          </p>
          <ol className="list-disc text-blue-700 text-sm space-y-2 text-left">
            <li class="text-sm">Menunggu konfirmasi petugas perpustakaan (1x24 jam)</li>
            <li class="text-sm">
              Setelah dikonfirmasi, buku dapat diambil di perpustakaan
            </li>
            <li class="text-sm">Tunjukkan kartu identitas saat pengambilan</li>
          </ol>
        </div>
        <button @click="showModal = false" class="btn-primary w-full mt-4 text-sm py-3">
          Mengerti
        </button>
      </div></Modal
    >
  </section>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import DateFormControl from "../components/ui/DateFormControl.vue";
import useGetOneBook from "../composables/book/useGetOneBook";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import AreaFormControl from "../components/ui/AreaFormControl.vue";
import { ref, watchEffect } from "vue";
import useCreateBooking from "../composables/booking/useCreateBooking";
import Modal from "../components/ui/Modal.vue";
import { Check } from "lucide-vue-next";

const term = ref(false);
const errorTerm = ref(false);
const showModal = ref(false);

const schema = toTypedSchema(
  z.object({
    date: z.array(z.date()).nonempty("Tanggal tidak boleh kosong"),
    note: z.string().optional(),
    bookId: z.string().nonempty("Buku tidak boleh kosong"),
  })
);

const { data, isPending } = useGetOneBook();
const { mutate, isPending: isPendingCreate } = useCreateBooking();

const form = useForm({
  validationSchema: schema,
  initialValues: {
    date: [new Date(), new Date()],
    note: "",
    bookId: "",
  },
});

const handleCheck = (e: Event) => {
  term.value = (e.target as HTMLInputElement).checked;
  errorTerm.value = false;
};

watchEffect(() => {
  form.setFieldValue("bookId", data.value?.data?.id || "");
});

const onSubmit = form.handleSubmit((values) => {
  if (!term.value) return (errorTerm.value = true);

  mutate(values, {
    onSuccess() {
      showModal.value = true;
    },
  });
});
</script>

<style></style>

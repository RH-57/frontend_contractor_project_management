<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeById } from '../../../composables/employee/useEmployeeById';
import { useEmployeeUpdate } from '../../../composables/employee/useEmployeeUpdate';
import { useToast } from 'vue-toastification';
import { ArrowLeft, Loader2, Save } from 'lucide-vue-next';

const toast = useToast()
const route = useRoute()
const router = useRouter()
const errorMessage = ref('')

const id = Number(route.params.id)

// State Form
const name = ref<string>('')
const position = ref<string>('')
const type = ref<string>('TETAP')
const phone = ref<string>('')
const address = ref<string>('')
const daily_rate = ref<number | null>(null)
const is_active = ref<boolean>(true)

const errors = reactive<Record<string, string>>({})

// Composables TanStack Query
const { data: employee, isLoading, isError } = useEmployeeById(id)
const { mutate, isPending } = useEmployeeUpdate()

// Mengisi data form otomatis setelah data dari API berhasil dimuat
watchEffect(() => {
  if (employee.value) {
    name.value = employee.value.name || ''
    position.value = employee.value.position || ''
    type.value = employee.value.type || 'TETAP'
    phone.value = employee.value.phone || ''
    address.value = employee.value.address || ''
    daily_rate.value = employee.value.daily_rate ? Number(employee.value.daily_rate) : null
    const activeData = employee.value.is_active;
    is_active.value = activeData === true || Number(activeData) === 1;
  }
})

const updateEmployee = (e: Event) => {
  e.preventDefault()

  errorMessage.value = ''
  Object.keys(errors).forEach(key => delete errors[key])

  if (!name.value.trim() || !position.value.trim() || daily_rate.value === null) {
    errorMessage.value = 'Semua field yang bertanda * wajib diisi.'
    return
  }

  mutate(
    {
      id,
      data: {
        name: name.value,
        position: position.value,
        type: type.value,
        phone: phone.value,
        address: address.value,
        daily_rate: Number(daily_rate.value),
        is_active: is_active.value
      }
    },
    {
      onSuccess: () => {
        toast.success('Berhasil memperbarui data karyawan')
        router.push('/employees')
      },
      onError: (error: any) => {
        toast.error('Gagal memperbarui data karyawan')
        if (error.response?.data?.errors) {
          Object.assign(errors, error.response.data.errors)
        }
      },
    }
  )
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Page -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Edit Karyawan</h1>
        <p class="text-sm text-slate-500 mt-1">Perbarui informasi data karyawan.</p>
      </div>
      <div>
        <button
          @click="goBack"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </div>
    </div>

    <!-- Skeleton / Loading State -->
    <div v-if="isLoading" class="bg-white p-6 rounded-2xl border border-slate-200 flex justify-center items-center min-h-[300px]">
      <div class="flex items-center gap-2 text-slate-500">
        <Loader2 class="w-6 h-6 animate-spin text-[#FBB03B]" />
        <span>Memuat data karyawan...</span>
      </div>
    </div>

    <!-- Error Fetching State -->
    <div v-else-if="isError" class="bg-rose-50 border border-rose-200 text-rose-600 p-6 rounded-2xl text-center">
      Data karyawan tidak ditemukan atau terjadi kesalahan server.
    </div>

    <!-- Form Edit -->
    <div v-else class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <form @submit="updateEmployee" class="space-y-6">
        <div v-if="errorMessage" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
          {{ errorMessage }}
        </div>

        <div class="space-y-4">
          <!-- Nama Lengkap -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Lengkap <span class="text-rose-500">*</span>
            </label>
            <input 
              v-model="name"
              type="text"
              placeholder="Masukan Nama Lengkap"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-rose-500">{{ errors.name }}</p>
          </div>

          <!-- Position & Type -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                Jabatan / Posisi <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="position" 
                type="text"
                placeholder="Masukan Jabatan / Posisi"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
              />
              <p v-if="errors.position" class="mt-1 text-xs text-rose-500">{{ errors.position }}</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                Status Kontrak
              </label>
              <select
                v-model="type"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150 bg-white"
              >
                <option value="TETAP">Tetap</option>
                <option value="BORONGAN">Borongan</option>
              </select>
              <p v-if="errors.type" class="mt-1 text-xs text-rose-500">{{ errors.type }}</p>
            </div>
          </div>

          <!-- Phone & Daily Rate -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                No. Handphone
              </label>
              <input
                v-model="phone" 
                type="text"
                placeholder="Masukan Nomor Handphone"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
              />
              <p v-if="errors.phone" class="mt-1 text-xs text-rose-500">{{ errors.phone }}</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                Upah / Gaji Harian <span class="text-rose-500">*</span>
              </label>
              <input
                v-model.number="daily_rate" 
                type="number"
                placeholder="Masukan Upah / Gaji Harian"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
              />
              <p v-if="errors.daily_rate" class="mt-1 text-xs text-rose-500">{{ errors.daily_rate }}</p>
            </div>
          </div>

          <!-- Address -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
              Alamat
            </label>
            <textarea 
              v-model="address"
              rows="3"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
            ></textarea>
            <p v-if="errors.address" class="mt-1 text-xs text-rose-500">{{ errors.address }}</p>
          </div>

          <!-- Status Aktif Karyawan -->
          <!-- Status Keaktifan (Switch Toggle) -->
            <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2">
                Status Keaktifan
            </label>
            <div class="flex items-center gap-3">
                <button
                type="button"
                @click="is_active = !is_active"
                :class="[
                    is_active ? 'bg-[#FBB03B]' : 'bg-slate-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FBB03B] focus:ring-offset-2'
                ]"
                role="switch"
                :aria-checked="is_active"
                >
                <span
                    :class="[
                    is_active ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ]"
                />
                </button>
                
                <span class="text-sm font-medium" :class="is_active ? 'text-slate-800' : 'text-slate-400'">
                {{ is_active ? 'Karyawan Aktif' : 'Non-Aktif' }}
                </span>
            </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="goBack"
            :disabled="isPending"
            class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition duration-150 disabled:opacity-50"    
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isPending"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150 disabled:opacity-50"
          >
            <Loader2 v-if="isPending" class="w-4 h-4 animate-spin" />
            <Save v-else class="w-4 h-4" />
            <span>{{ isPending ? 'Menyimpan...' : 'Perbarui Karyawan' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
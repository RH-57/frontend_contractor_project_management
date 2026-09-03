<script setup lang="ts">
import { ArrowLeft, Loader2, Save } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectCreate } from '../../../composables/project/useProjectCreate';
import { useCustomers } from '../../../composables/customer/useCustomers';
import { useEmployee } from '../../../composables/employee/useEmployee';
import { useToast } from 'vue-toastification';
import { useProjectCode } from '../../../composables/project/useProjectCode';

const router = useRouter()
const toast = useToast()
const errorMessage = ref('')

const { mutate: createProject, isPending } = useProjectCreate()
const { data: projectCode, isLoading: isCodeLoading } = useProjectCode()
const { data: customers} = useCustomers()
const { data: employees} = useEmployee()

const form = ref({
    code: '',
    name: '',
    customer_id: '' as number | '',
    contract_value: 0,
    estimated_cost: 0,
    employee_id: null as number | null,
    status: 'PLANNED',
    address: '',
    description: '',
    start_date: '',
    end_date: '',
})

watch(projectCode, (newCode) => {
    if (newCode) {
        form.value.code = newCode
    }
}, { immediate: true})

const storeProject = () => {
    errorMessage.value = ''

    if (!form.value.name || !form.value.customer_id || !form.value.start_date || !form.value.end_date) {
        errorMessage.value = 'Silakan isi semua bidang wajib (*)'
        return
    }

    createProject(
    {
      name: form.value.name,
      customer_id: Number(form.value.customer_id),
      contract_value: Number(form.value.contract_value),
      estimated_cost: Number(form.value.estimated_cost),
      employee_id: form.value.employee_id ? Number(form.value.employee_id) : null,
      status: form.value.status,
      address: form.value.address,
      description: form.value.description,
      start_date: form.value.start_date,
      end_date: form.value.end_date,
    },
    {
      onSuccess: () => {
        toast.success('Proyek berhasil dibuat!')
        router.push('/projects')
      },
      onError: (err: any) => {
        errorMessage.value = err.response?.data?.message || 'Gagal membuat proyek'
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
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Buat Proyek Baru</h1>
                <p class="text-sm text-slate-500 mt-1">Daftarkan proyek konstruksi dan setup nilai kontrak.</p>
            </div>
            <div>
                <button
                    @click="goBack"
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition duration-150"
                >
                    <ArrowLeft class="w-4 h-4" />
                    <span>Kembali</span>
                </button>
            </div>
        </div>

        <!-- Form Container -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <form @submit.prevent="storeProject" class="space-y-6">
                <!-- Error Alert -->
                <div v-if="errorMessage" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                    {{ errorMessage }}
                </div>

                <div class="space-y-4">
                    <!-- Kode Proyek (Auto-generated) & Nama Proyek -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Kode Proyek (Otomatis)
                            </label>
                            <div class="relative">
                                <input 
                                    v-model="form.code"
                                    type="text"
                                    disabled
                                    placeholder="Memuat kode..."
                                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm font-mono font-semibold focus:outline-none cursor-not-allowed"
                                />
                                <Loader2 v-if="isCodeLoading" class="w-4 h-4 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-500" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Nama Proyek <span class="text-rose-500">*</span>
                            </label>
                            <input 
                                v-model="form.name"
                                type="text"
                                placeholder="Masukkan nama proyek"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                    </div>

                    <!-- Customer & Project Manager (Employee) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Pelanggan / Customer <span class="text-rose-500">*</span>
                            </label>
                            <select 
                                v-model="form.customer_id"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            >
                                <option value="" disabled>Pilih Customer</option>
                                <option v-for="c in customers" :key="c.id" :value="c.id">
                                    {{ c.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Project Manager (Opsional)
                            </label>
                            <select 
                                v-model="form.employee_id"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            >
                                <option :value="null">-- Belum Ditentukan --</option>
                                <option v-for="e in employees" :key="e.id" :value="e.id">
                                    {{ e.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Alamat Proyek <span class="text-rose-500">*</span>
                            </label>
                            <textarea 
                                v-model="form.address"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150">
                            </textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Deskripsi 
                            </label>
                            <textarea 
                                v-model="form.description"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150">
                            </textarea>
                        </div>
                    </div>

                    <!-- Nilai Kontrak & Estimasi Biaya -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Nilai Kontrak (Rp)
                            </label>
                            <input 
                                v-model.number="form.contract_value"
                                type="number"
                                min="0"
                                placeholder="0"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Estimasi Biaya / Cost (Rp)
                            </label>
                            <input 
                                v-model.number="form.estimated_cost"
                                type="number"
                                min="0"
                                placeholder="0"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                    </div>

                    <!-- Status, Tanggal Mulai & Selesai -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Status Proyek
                            </label>
                            <select 
                                v-model="form.status"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            >
                                <option value="PLANNED">Planned</option>
                                <option value="ON_PROGRESS">On Progress</option>
                                <option value="COMPLETE">Complete</option>
                                <option value="CANCELED">Canceled</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Tanggal Mulai <span class="text-rose-500">*</span>
                            </label>
                            <input 
                                v-model="form.start_date"
                                type="date"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Tanggal Selesai <span class="text-rose-500">*</span>
                            </label>
                            <input 
                                v-model="form.end_date"
                                type="date"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        :disabled="isPending || isCodeLoading"
                        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150 disabled:opacity-50"
                    >
                        <Loader2 v-if="isPending" class="w-4 h-4 animate-spin" />
                        <Save v-else class="w-4 h-4" />
                        <span>Simpan Proyek</span>
                    </button>
                </div>
            </form>
        </div>
    </div>  
</template>
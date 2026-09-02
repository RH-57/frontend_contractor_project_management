<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useVendorCreate } from '../../../composables/vendor/useVendorCreate';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { ArrowLeft, Loader2, Save } from 'lucide-vue-next';

const toast = useToast()
const router = useRouter()
const errorMessage = ref('')

const name = ref<string>('')
const type = ref<string>('SUPPLIER')
const phone = ref<string>('')
const email = ref<string>('')
const npwp = ref<string>('')
const payment_terms = ref<string>('0')
const address = ref<string>('')
const note = ref<string>('')

const errors = reactive<Record<string, string>>({})
const {mutate, isPending} = useVendorCreate()

const storeVendor = (e: Event) => {
    e.preventDefault()

    errorMessage.value = ''

    if (!name.value.trim() || !phone.value.trim() || !email.value.trim()) {
        errorMessage.value = 'Semua field yang bertanda * wajib diisi.'
        return
    }

    mutate(
        {
            name: name.value,
            type: type.value,
            phone: phone.value,
            email: email.value,
            npwp: npwp.value,
            payment_terms: payment_terms.value,
            address: address.value,
            note: note.value
        },
        {
            onSuccess: () => {
                toast.success('Berhasil menambahkan data vendor')
                router.push('/vendors')
            },
            onError: (error: any) => {
                toast.error('Gagal menambahkan data vendor')
                Object.assign(errors, error.response.data.errors)
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
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Tambah Vendor</h1>
                <p class="text-sm text-slate-500 mt-1">Daftarkan data vendor baru.</p>
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
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <form @submit="storeVendor" class="space-y-6">
                <div v-if="errorMessage" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                    {{ errorMessage }}
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                            Name Vendor <span class="text-rose-500">*</span>
                        </label>
                        <input 
                            v-model="name"
                            type="text"
                            placeholder="Masukan Nama Vendor"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                        />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                No. Telpon <span class="text-rose-500">*</span>
                            </label>
                            <input
                                v-model="phone" 
                                type="text"
                                placeholder="08123456789"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Email <span class="text-rose-500">*</span>
                            </label>
                            <input
                                v-model="email" 
                                type="email"
                                placeholder="email@domain.com"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                NPWP 
                            </label>
                            <input
                                v-model="npwp" 
                                type="text"
                                placeholder="00.000.000.0-000.000"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                            />
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Tipe
                                </label>
                                <select
                                    v-model="type"
                                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150 bg-white"
                                >
                                    <option value="SUPPLIER">Supplier</option>
                                    <option value="SUBCON">Subcon</option>
                                    <option value="BOTH">Supplier & Subcon</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Termin Bayar
                                </label>
                                <input
                                    v-model="payment_terms" 
                                    type="text"
                                    placeholder="0"
                                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                            Alamat
                        </label>
                        <textarea 
                            v-model="address"
                            type="text"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                            Catatan
                        </label>
                        <textarea 
                            v-model="note"
                            type="text"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                        ></textarea>
                    </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        @click="goBack"
                        :disabled="isPending"
                        class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-150 disabled:opacity-50"    
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
                        <span>{{ isPending ? 'Menyimpan...' : 'Simpan Vendor' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
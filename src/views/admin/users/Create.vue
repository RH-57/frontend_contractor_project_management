<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft, Eye, EyeOff, Loader2, Save } from 'lucide-vue-next';
import {ref, reactive} from 'vue';
import { useUserCreate } from '../../../composables/user/useUserCreate';
import { useToast } from 'vue-toastification';

const toast = useToast();

const router = useRouter()

const showPassword = ref(false);
const errorMessage = ref('');

const name = ref<string>('')
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const role = ref<string>('STAFF')

const errors = reactive<Record<string, string>>({})

const { mutate, isPending } = useUserCreate()

const storeUser = (e: Event) => {
    e.preventDefault()

    errorMessage.value = ''

    if (!name.value.trim() || !username.value.trim() || !email.value.trim() || !password.value.trim() ) {
        errorMessage.value = 'Semua field yang bertanda * wajib diisi'
        return
    }

    mutate(
        {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            role: role.value,
        },
        {
            onSuccess: () => {
                toast.success('Berhasil membuat pengguna baru.')
                router.push('/users')
            },
            onError: (error: any) => {
                toast.error('Gagal menambahkan pengguna baru!')
                Object.assign(errors, error.response.data.errors)
            },
        }
    )
}

const goBack = () => {
  router.back();
};

</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Tambah Pengguna</h1>
                <p class="text-sm text-slate-500 mt-1">Daftarkan pengguna baru dan tentukan role mereka.</p>
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
            <form @submit="storeUser" class="space-y-6">
                <div v-if="errorMessage" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                    {{ errorMessage }}
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                            Name Lengkap <span class="text-rose-500">*</span>
                        </label>
                        <input 
                            v-model="name"
                            type="text"
                            placeholder="Masukan Nama Lengkap"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                        />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Username <span class="text-rose-500">*</span>
                            </label>
                            <input
                                v-model="username"
                                type="text"
                                placeholder="Masukan Username"
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
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Password <span class="text-rose-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••"
                                    class="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <EyeOff v-if="showPassword" class="w-4 h-4" />
                                    <Eye v-else class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                                Role
                            </label>
                            <select
                                v-model="role"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150 bg-white"
                            >
                                <option value="STAFF">Staff</option>
                                <option value="PROJECT_MANAGER">Project Manager</option>
                                <option value="FINANCE">Finance</option>
                            </select>
                        </div>
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
                        <span>{{ isPending ? 'Menyimpan...' : 'Simpan Pengguna' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
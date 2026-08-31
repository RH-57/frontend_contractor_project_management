<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { AlertCircle, Loader2, Pencil, Search, Trash2, UserCheck, UserPlus, UserX } from 'lucide-vue-next';
import { useEmployee, type Employee } from '../../../composables/employee/useEmployee';
import { useEmployeeDelete } from '../../../composables/employee/useEmployeeDelete';
import { useToast } from 'vue-toastification';

const toast = useToast()
const queryClient = useQueryClient()
const { data: employee, isLoading, isError, error} = useEmployee()
const searchQuery = ref('')

const filteredEmployees = computed<Employee[]>(() => {
    if (!employee.value) return []
    if (!searchQuery.value.trim()) return employee.value

    const query = searchQuery.value.toLowerCase()
    return employee.value.filter((employee) =>
        employee.name?.toLowerCase().includes(query)
    )
})

const { mutate, isPending } = useEmployeeDelete()

const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data karyawan ini?")) {
        mutate(id, {
            onSuccess: () => {
                toast.success("Data karyawan berhasil dihapus.")
                queryClient.invalidateQueries({ queryKey: ['employees'] })
            }
        })
    }
}

const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);
};

</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Karyawan</h1>
                <p class="text-sm text-slate-500 mt-1">Kelola Data Karyawan</p>
            </div>
            <div>
                <router-link
                    to="/employees/create"
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150"
                >
                    <UserPlus class="w-4 h-4" />
                    <span>Tambah Karyawan</span>
                </router-link>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div class="relative flex-1">
                <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari berdasarkan nama"
                    class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                />
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg0slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th class="py-3.5 px-4">Code</th>
                            <th class="py-3.5 px-4">Nama Lengkap</th>
                            <th class="py-3.5 px-4">Jabatan/Staff</th>
                            <th class="py-3.5 px-4">Status Kontrak</th>
                            <th class="py-3.5 px-4">Nomor Hp</th>
                            <th class="py-3.5 px-4">Upah Harian</th>
                            <th class="py-3.5 px-4">Status</th>
                            <th class="py-3.5 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                        <tr v-if="isLoading">
                            <td colspan="5" class="py-12 text-center text-slate-400">
                                <Loader2 class="w-6 h-6 animate-spin mx-auto mb-2 text-[#FBB03B]" />
                                <span>Memuat data karyawan...</span>
                            </td>
                        </tr>

                        <tr v-else-if="isError">
                            <td colspan="5" class="py-12 text-center text-rose-500">
                                <AlertCircle class="w-6 h-6 mx-auto mb-2" />
                                <span>Gagal mengambil data: {{ error?.message || 'Terjadi kesalahan' }}</span>
                            </td>
                        </tr>

                        <tr v-else-if="filteredEmployees.length === 0">
                            <td colspan="5" class="py-12 text-center text-slate-400">
                                Tidak ada data karyawan yang ditemukan.
                            </td>
                        </tr>

                        <tr
                            v-else
                            v-for="employee in filteredEmployees"
                            :key="employee.id"
                            class="hover:bg-slate-50/50 transition duration-150"
                        >
                            <td class="py-3.5 px-4 text-slate-600 font-medium">
                                {{ employee.code }}
                            </td>
                            <td class="py-3.5 px-4 text-slate-600 font-medium">
                                {{ employee.name.toUpperCase() }}
                            </td>
                            <td class="py-3.5 px-4 text-slate-600 font-medium">
                                {{ employee.position.toUpperCase() }}
                            </td>
                            <td class="py-3.5 px-4">
                                <span
                                    :class="[
                                        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider',
                                        employee.type === 'TETAP'
                                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                                    ]"
                                >
                                    {{ employee.type }}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 text-slate-600 font-medium">
                                {{ employee.phone }}
                            </td>
                            <td class="py-3.5 px-4 text-slate-600 font-medium">
                                {{ formatCurrency(employee.daily_rate) }}
                            </td>
                            <td class="py-3.5 px-4">
                                <span
                                :class="[
                                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                                    employee.is_active
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                ]"
                                >
                                <UserCheck v-if="employee.is_active" class="w-3.5 h-3.5" />
                                <UserX v-else class="w-3.5 h-3.5" />
                                {{ employee.is_active ? 'Aktif' : 'Nonaktif' }}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 text-right">
                                <div class="flex items-center justify-end gap-1">
                                    <router-link
                                        :to="`/employees/edit/${employee.id}`"
                                        title="Edit Pengguna"
                                        class="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition duration-150"
                                    >
                                        <Pencil class="w-4 h-4" />
                                    </router-link>
                                    <button
                                        @click="handleDelete(employee.id)"
                                        title="Hapus Pengguna"
                                        class="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition duration-150"
                                    >
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
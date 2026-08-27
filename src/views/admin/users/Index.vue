<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Search, 
  UserPlus, 
  Pencil, 
  Trash2, 
  UserCheck, 
  UserX, 
  Loader2, 
  AlertCircle 
} from 'lucide-vue-next';
import { useUsers, type User } from '../../../composables/user/useUser';

// Panggil composable (data otomatis bertipe User[] | undefined)
const { data: users, isLoading, isError, error } = useUsers();

const searchQuery = ref('');

// Filter Live Search langsung mengacu ke `users`
const filteredUsers = computed<User[]>(() => {
  if (!users.value) return [];
  if (!searchQuery.value.trim()) return users.value;
  
  const query = searchQuery.value.toLowerCase();
  return users.value.filter((user) => 
    user.name?.toLowerCase().includes(query) ||
    user.username?.toLowerCase().includes(query) ||
    user.email?.toLowerCase().includes(query)
  );
});

const handleEdit = (user: User) => {
  console.log('Edit user:', user);
};

const handleDelete = (id: number) => {
  console.log('Hapus user ID:', id);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Pengguna</h1>
        <p class="text-sm text-slate-500 mt-1">Kelola akun pengguna aplikasi dan role mereka.</p>
      </div>
      <div>
        <router-link
            to="/users/create"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150"
        >
          <UserPlus class="w-4 h-4" />
          <span>Tambah Pengguna</span>
      </router-link>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
      <div class="relative flex-1">
        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari berdasarkan nama, username, atau email..."
          class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
        />
      </div>
    </div>

    <!-- Tabel Data User -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th class="py-3.5 px-4">Pengguna</th>
              <th class="py-3.5 px-4">Username</th>
              <th class="py-3.5 px-4">Role</th>
              <th class="py-3.5 px-4">IsActive</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <!-- Loading State -->
            <tr v-if="isLoading">
              <td colspan="5" class="py-12 text-center text-slate-400">
                <Loader2 class="w-6 h-6 animate-spin mx-auto mb-2 text-[#FBB03B]" />
                <span>Memuat data pengguna...</span>
              </td>
            </tr>

            <!-- Error State -->
            <tr v-else-if="isError">
              <td colspan="5" class="py-12 text-center text-rose-500">
                <AlertCircle class="w-6 h-6 mx-auto mb-2" />
                <span>Gagal mengambil data: {{ error?.message || 'Terjadi kesalahan' }}</span>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-else-if="filteredUsers.length === 0">
              <td colspan="5" class="py-12 text-center text-slate-400">
                Tidak ada data pengguna yang ditemukan.
              </td>
            </tr>

            <!-- Data Render -->
            <tr
              v-else
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-slate-50/50 transition duration-150"
            >
              <!-- Info User -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                    {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-slate-800 truncate">{{ user.name }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Username -->
              <td class="py-3.5 px-4 text-slate-600 font-medium">
                {{ user.username }}
              </td>

              <!-- Role Badge -->
              <td class="py-3.5 px-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider',
                    user.role === 'admin'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : user.role === 'pm'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- Status Badge -->
              <td class="py-3.5 px-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                    user.is_active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  ]"
                >
                  <UserCheck v-if="user.is_active" class="w-3.5 h-3.5" />
                  <UserX v-else class="w-3.5 h-3.5" />
                  {{ user.is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <router-link
                    :to="`/users/edit/${user.id}`"
                    title="Edit Pengguna"
                    class="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition duration-150"
                  >
                    <Pencil class="w-4 h-4" />
                </router-link>
                  <button
                    @click="handleDelete(user.id)"
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
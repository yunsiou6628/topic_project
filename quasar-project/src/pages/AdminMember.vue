<!-- AdminMember 會員管理 -->
<template>
  <div class="q-pa-md">
    <q-table
      title="會員資料"
      :rows="users"
      :columns="columns"
      row-key="name"
    >
      <!-- 刪除 -->
      <template #body-cell-edit="edit">
        <q-td>
          <!-- {{edit.row._id}} -->
          <q-btn @click="deleteuser(edit.row._id)">刪除</q-btn>
          </q-td>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'

const users = reactive([])

const columns = [
  {
    name: 'name',
    required: true,
    label: '姓名',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'account',
    required: true,
    label: '帳號',
    align: 'left',
    field: row => row.account,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'left',
    field: row => row.email,
    sortable: true
  },
  {
    name: 'edit',
    required: true,
    label: '編輯修改',
    align: 'left',
    sortable: true
  }
]

const deleteuser = async (userid) => {
  try {
    await apiAuth.delete('/users/' + userid)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功'
    })
    // 在成功的地方再呼叫一次 function 即時更新刪除結果
    const idx = users.findIndex(user => user._id === userid)
    users.splice(idx, 1)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 抓取會員註冊時資料->抓取會員訂單資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/all')
    users.push(...data.result)
    console.log(users)
  } catch (error) {
    // console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '無法取得使用者資料'
    })
  }
}
init()
</script>

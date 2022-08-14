<!-- AdminMember 會員管理 -->
<template>
  <div class="q-pa-md">
    <q-table
      title="會員資料"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: '姓名',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'account',
    required: true,
    label: '帳號',
    align: 'left',
    field: row => row.account,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'password',
    required: true,
    label: '密碼',
    align: 'left',
    field: row => row.password,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'left',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'gender',
    required: true,
    label: '性別',
    align: 'left',
    field: row => row.gender,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'birthday',
    required: true,
    label: '生日',
    align: 'left',
    field: row => row.birthday,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'line_id',
    required: true,
    label: 'line_id',
    align: 'left',
    field: row => row.line_id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'phone',
    required: true,
    label: '手機',
    align: 'left',
    field: row => row.phone,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'identification',
    required: true,
    label: '身分證',
    align: 'left',
    field: row => row.identification,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'emergency_contact',
    required: true,
    label: '緊急聯絡人',
    align: 'left',
    field: row => row.emergency_contact,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'emergency_contact_phone',
    required: true,
    label: '緊急聯絡人電話',
    align: 'left',
    field: row => row.emergency_contact_phone,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'edit',
    required: true,
    label: '編輯修改',
    align: 'left',
    // field: row => row.sell,
    // format: val => `${val}`,
    sortable: true
  }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    account: '',
    password: '',
    email: '',
    gender: 0,
    birthday: 0,
    line_id: '',
    phone: '',
    identification: '',
    emergency_contact: '',
    emergency_contact_phone: 0
  }
]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>

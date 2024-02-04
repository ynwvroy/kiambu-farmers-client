<!-- BaseTable.vue -->
<template>
  <v-card-title class="text-h5 pt-sm-2 pb-7">{{ title }}</v-card-title>
  <v-table class="month-table" fixed-header hover>
    <thead>
      <tr style="border-bottom: 1.4px solid #2a2d34 !important">
        <th
          v-for="column in columns"
          :key="column.key"
          class="text-subtitle-1 font-weight-bold"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        style="border-bottom: 1.4px solid #2a2d34 !important"
        v-for="item in data"
        :key="item.id"
        class="month-item"
      >
        <td v-for="column in columns" :key="column.key">
          <div>
            <p class="text-15 font-weight-medium">{{ item[column.key] }}</p>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    title: String,
    columns: Array,
    data: Array,
  },
};
</script>

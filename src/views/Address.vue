<template>
  <div class="q-pa-md">
    <q-table title="My Address" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script>
export default {
  name: 'AddressPage',
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', fields: 'name' },
        { name: 'receiver', label: 'Receiver', fields: 'receiver' },
        { name: 'address', label: 'Address', fields: 'address' },
        { name: 'city', label: 'City', fields: 'city' },
        { name: 'province', label: 'Province', fields: 'province' },
      ],
      rows: [
        {
          name: 'Home',
          receiver: 'Anggi Dastariana',
          address: 'Perumahan Taman Kutabumi',
          city: 'Tangerang',
          province: 'Banten',
        },
      ],
    };
  },
};
</script>

<style></style>

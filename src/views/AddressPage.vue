<template>
  <div>
    <div class="q-pa-md">
      <q-table title="My Address" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name" title="Update name" buttons>
                <q-input v-model="props.row.name" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="receiver" :props="props">
              {{ props.row.receiver }}
              <q-popup-edit v-model="props.row.receiver" title="Update receiver" buttons>
                <q-input v-model="props.row.receiver" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="address" :props="props">
              <div class="text-pre-wrap">{{ props.row.address }}</div>
              <q-popup-edit v-model="props.row.address" title="Update address" buttons>
                <q-input v-model="props.row.address" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="city" :props="props">
              {{ props.row.city }}
              <q-popup-edit v-model="props.row.city" title="Update city" buttons>
                <q-input v-model="props.row.city" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="province" :props="props">
              {{ props.row.province }}
              <q-popup-edit v-model="props.row.province" title="Update province" buttons>
                <q-input v-model="props.row.province" dense autofocus counter />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md" align="right">
      <q-btn type="submit" square style="width: 150px" color="dark" size="md" label="add address" @click="medium = true" />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Add Address</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Click/Tap on the backdrop.
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
// const columns = [
//   { name: 'name', label: 'Name', field: 'name' },
//   { name: 'receiver', label: 'Receiver', field: 'receiver' },
//   { name: 'address', label: 'Address', field: 'address' },
//   { name: 'city', label: 'City', field: 'city' },
//   { name: 'province', label: 'Province', field: 'province' },
// ];

// const rows = [
//   {
//     name: 'Home',
//     receiver: 'Anggi Dastariana',
//     address: 'Perumahan Taman Kutabumi',
//     city: 'Tangerang',
//     province: 'Banten',
//   },
// ];
import { ref } from 'vue';

export default {
  name: 'AddressPage',
  setup() {
    return {
      medium: ref(false),
      // columns,
      // rows,
    };
  },
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'receiver', label: 'Receiver', field: 'receiver' },
        { name: 'address', label: 'Address', field: 'address' },
        { name: 'city', label: 'City', field: 'city' },
        { name: 'province', label: 'Province', field: 'province' },
      ],
      rows: [
        {
          name: 'Home',
          receiver: 'Anggi Dastariana',
          address: 'Perumahan Taman Kutabumi, Jalan Sriwijaya 1, Blok C7 No. 6',
          city: 'Tangerang',
          province: 'Banten',
        },
      ],
    };
  },
  methods: {
    addAddress() {
      this.$router.push('/myaddress/form');
    },
  },
};
</script>

<style></style>

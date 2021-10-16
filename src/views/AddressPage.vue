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
            <q-td key="action" :props="props">
              <q-btn dense :ripple="false" flat rounded icon="delete" @click="deleteAddress(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md" align="right">
      <q-btn square style="width: 150px" color="dark" size="md" label="add address" @click="medium = true" />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="medium">
        <q-card square flat style="width: 700px; max-width: 80vw;" class="column justify-center">
          <q-card-section horizontal>
            <div class="q-my-sm q-ml-md text-weight-medium text-h5 text-uppercase poppins-font">Add Address</div>
            <q-space />
            <q-btn icon="close" size="lg" flat round dense v-close-popup :to="close" />
          </q-card-section>

          <q-card-section>
            <q-form @submit="addAddress">
              <div class="row">
                <div class="col">
                  <span class="text-weight-bold">Name</span>
                  <q-input type="text" v-model="name" class="q-mt-sm q-mb-md" placeholder="e.g. Home; Office" square outlined dense required />
                </div>
                <q-space class="q-px-xs" />
                <div class="col">
                  <span class="text-weight-bold">Receiver</span>
                  <q-input type="text" v-model="receiver" class="q-mt-sm q-mb-md" placeholder="e.g. John Doe" square outlined dense required />
                </div>
              </div>

              <div>
                <span class="text-weight-bold">Address Detail</span>
                <q-input
                  type="textarea"
                  v-model="address"
                  class="q-mt-sm q-mb-md"
                  placeholder="Input address detail: block; floor number; street number, etc."
                  square
                  outlined
                  dense
                  required
                />
              </div>

              <div class="row">
                <div class="col">
                  <span class="text-weight-bold">Province</span>
                  <q-select class="q-mt-sm q-mb-md" v-model="province" :options="provinces" label="-- choose province --" square outlined required />
                </div>
                <q-space class="q-px-xs" />
                <div class="col">
                  <span class="text-weight-bold">City</span>
                  <q-select type="text" class="q-mt-sm q-mb-md" v-model="city" :options="cities" label="-- choose city --" square outlined required />
                </div>
              </div>

              <q-btn type="submit" square class="full-width" color="dark" size="md" label="add address" />
            </q-form>
          </q-card-section>

          <!-- <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions> -->
        </q-card>
      </q-dialog>
    </div>

    <router-view></router-view>
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
        { name: 'action', label: 'Action', field: 'action' },
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

      provinces: ['Banten', 'D.K.I. Jakarta', 'Jawa Barat'],
      cities: ['Tangerang', 'Serang', 'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Bogor'],

      name: '',
      receiver: '',
      address: '',
      province: '',
      city: '',
    };
  },
  methods: {
    addAddress() {
      this.rows.push({
        name: this.name,
        receiver: this.receiver,
        address: this.address,
        province: this.province,
        city: this.city,
      });
    },

    deleteAddress(props) {
      console.log(props);
      this.rows = this.rows.filter((el) => el.name != props.name && el.receiver != props.receiver);
    },
  },
  created() {
    if (this.isLogin) this.$store.dispatch('fetchCart');
    // window.scrollTo(0, 0);
  },
};
</script>

<style></style>

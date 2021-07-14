<template>
  <q-dialog v-model="card">
    <q-card class="my-card" flat bordered style="width: 700px; max-width: 80vw;">
      <q-card-section horizontal>
        <!-- <q-img class="col-6" :src="product.image_url1" /> -->
        <q-carousel class="col-6" animated v-model="slide" arrows navigation infinite>
          <q-carousel-slide :name="1" :img-src="product.image_url1" />
          <q-carousel-slide :name="2" :img-src="product.image_url1" />
          <!-- <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" /> -->
        </q-carousel>

        <q-card-section>
          <div class="text-h2 text-grey-9 text-weight-regular poppins-font">
            {{ product.name }}
          </div>
          <div class="q-ml-xs q-mt-sm q-mb-md text-subtitle1 text-weight-bold text-grey">Rp. {{ product.price }}</div>
          <div class="q-ml-xs text-body1 text-weight-medium text-grey-7">Description:</div>
          <div class="q-ml-xs text-body2 text-grey-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque commodi non! Vel, asperiores eos, aliquam repellendus iste
            optio voluptatem autem, commodi reprehenderit cum modi iusto excepturi et enim illum?
          </div>
          <div class="q-ml-xs q-mt-lg q-mb-xs text-caption text-grey-7">Stock: {{ product.stock }}</div>
          <q-btn class="full-width" color="black" size="md" label="add to cart" />
        </q-card-section>

        <!-- <q-card-section class="q-mb-sm"> -->
        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" flat round dense v-close-popup to="/shop" />
        </div>
        <!-- </q-card-section> -->
      </q-card-section>

      <!-- <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          5:30PM
        </q-btn>
        <q-btn flat>
          7:00PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions> -->
    </q-card>
    <!-- <q-card class="my-card">
      <q-card-section class="q-mb-sm">
        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" flat round dense v-close-popup to="/shop" />
        </div>
      </q-card-section>
      <q-img :src="product.image_url1" />

      <q-card-section>
        <q-btn fab color="primary" icon="place" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%);" />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Cafe Basilico
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          $・Italian, Cafe
        </div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Reserve" />
        <q-btn v-close-popup flat color="primary" round icon="event" />
      </q-card-actions>
    </q-card> -->
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    return {
      card: ref(true),
      slide: ref(1),
    };
  },
  computed: {
    product() {
      console.log(this.$store.state.product);
      return this.$store.state.product;
    },
  },
  created() {},
};
</script>

<style></style>

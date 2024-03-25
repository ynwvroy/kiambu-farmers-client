<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

// import { productsCard } from "@/data/dashboard/dashboardData";
/*--Products Cards--*/
import proimg1 from "/images/products/s4.jpg";
import proimg2 from "/images/products/s5.jpg";
import proimg3 from "/images/products/s7.jpg";
import proimg4 from "/images/products/s11.jpg";

const productsCard = [
  {
    title: "Boat Headphone",
    link: "/",
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    link: "/",
    photo: proimg2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    link: "/",
    photo: proimg3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    link: "/",
    photo: proimg4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
  {
    title: "Boat Headphone",
    link: "/",
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
];

const products = ref();

const response = await useApi<IGetAllProducts>("/products", {
  method: "GET",
});

products.value = response?.data;
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="Latest from our producers!">
        <div class="pa-7 pt-1">
          <v-row>
            <v-col
              cols="12"
              lg="3"
              sm="6"
              v-for="product in products"
              :key="product.id"
            >
              <v-card elevation="10" class="withbg" rounded="md">
                <NuxtLink :to="product.link">
                  fix here
                </NuxtLink>
                <div class="d-flex justify-end mr-4 mt-n5">
                  <v-btn size="40" icon class="bg-primary d-flex">
                    <v-avatar size="30" class="text-white">
                      <BasketIcon size="15" />
                    </v-avatar>
                    <v-tooltip activator="parent" location="bottom"
                      >Add To Cart
                    </v-tooltip>
                  </v-btn>
                </div>
                <v-card-item class="pt-0">
                  <h6 class="text-h6" v-text="product.name"></h6>
                  <div class="d-flex align-center justify-space-between mt-1">
                    <div>
                      <span class="text-h6" v-text="'$' + product.price"></span>
                    </div>
                  </div>

                  <p>Quantity in stock: {{ product.stock_quantity }}</p>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{ product?: any }>();

const router = useRouter()

const openPurchase = (product_id: number | undefined) => {
  router.push(`purchase?product=${product_id}`)
}
</script>

<template>

      <div class="cursor-pointer" @click="openPurchase(props.product.id)">
        <!-- ---------------------------------------------- -->
        <!-- Image -->
        <!-- ---------------------------------------------- -->
        <div style="height: 100%; width: 100%">
          <v-img
            :src="props.product.image_url"
            class="rounded-lg"
            alt="props.product image"
          />
        </div>
        <!-- ---------------------------------------------- -->
        <!-- Category & price-->
        <!-- ---------------------------------------------- -->
        <div class="mt-3">
          <div style="display: flex; justify-content: space-between" class="">
            <span class="my-3 text-primary">{{ props.product.category.name }}</span>
            <p class="my-3" style="color: plum">${{ props.product.price }}</p>
          </div>

          <!-- ---------------------------------------------- -->
          <!-- Name -->
          <!-- ---------------------------------------------- -->
          <h4 class="my-3">{{ props.product.name }}</h4>

          <!-- ---------------------------------------------- -->
          <!-- Description -->
          <!-- ---------------------------------------------- -->
          <div style="height: auto" class="my-6">
            {{
              props.product.description.length > 210
                ? `${props.product.description.substring(0, 210)}...`
                : props.product.description
            }}
          </div>
          <!-- ---------------------------------------------- -->
          <!-- About the seller -->
          <!-- ---------------------------------------------- -->
          <div>
            <div class="d-flex align-center" style="gap: 10px; cursor: pointer">
              <p style="text-decoration: underline" class="p-sm w-500">
                By {{ props.product.seller.full_name }}
              </p>
            </div>
          </div>
        </div>
      </div>
</template>

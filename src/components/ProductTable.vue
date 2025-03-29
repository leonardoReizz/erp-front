<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'


interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  price: number;
  unit: string;
  qty: number;
  description: string;
}

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          <Checkbox />  
        </TableHead>
        <TableHead class="w-[100px]">
          SKU
        </TableHead>
        <TableHead>Product Name</TableHead>
        <TableHead>Brand</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Unit</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead></TableHead>  
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="product in products" :key="product.id">
        <TableCell class="font-medium">
          <Checkbox />
        </TableCell>
        <TableCell>{{ product.sku }}</TableCell>
        <TableCell>{{ product.name }}</TableCell>
        <TableCell>{{ product.brand }}</TableCell>
        <TableCell>{{ product.price }}</TableCell>
        <TableCell>{{ product.unit }}</TableCell>
        <TableCell>{{ product.qty }}</TableCell>
        <TableCell>{{ product.description }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
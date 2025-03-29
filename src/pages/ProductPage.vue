<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useProductStore } from "@/store/useProductStore";
import ProductTable from "@/components/ProductTable.vue";
import Navbar from "@/components/Navbar.vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RefreshCwIcon, CirclePlusIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationList, PaginationFirst, PaginationPrev, PaginationNext, PaginationLast, PaginationListItem, PaginationEllipsis } from "@/components/ui/pagination";
const { products, loading } = useProductStore();
</script>

<template>
  <div class="flex h-screen w-full">
    <Sidebar />
    <div class="flex flex-col h-full w-full bg-gray-100">
      <Navbar />
      <div class="flex flex-col gap-4 p-4 w-full h-full">
        <div class="flex justify-between items-center gap-4 p-1">
          <div>
            <h3 class="text-2xl font-bold">Products List</h3>
            <p class="text-sm text-gray-500">Manage your products here  </p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCwIcon />
            </Button>
            <RouterLink to="/create-product" >
              <Button>
                <CirclePlusIcon />
                Add Product
              </Button>
            </RouterLink>
          </div>
        </div>
        <Card class="w-full h-full p-0">
          <CardHeader>
            <div class="flex justify-between items-center gap-4">
              <div class="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  class="pl-8"
                />
                <SearchIcon class="!size-5 absolute  top-2 left-2 text-muted-foreground" />
              </div>
              <div class="flex gap-2">
                <Select>
                  <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">
                        Apple
                      </SelectItem>
                      <SelectItem value="banana">
                        Banana
                      </SelectItem>
                      <SelectItem value="blueberry">
                        Blueberry
                      </SelectItem>
                      <SelectItem value="grapes">
                        Grapes
                      </SelectItem>
                      <SelectItem value="pineapple">
                        Pineapple
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">
                        Apple
                      </SelectItem>
                      <SelectItem value="banana">
                        Banana
                      </SelectItem>
                      <SelectItem value="blueberry">
                        Blueberry
                      </SelectItem>
                      <SelectItem value="grapes">
                        Grapes
                      </SelectItem>
                      <SelectItem value="pineapple">
                        Pineapple
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </div>
          </div>
          </CardHeader>
          <CardContent class="p-0 flex flex-col">
            <div class="h-full ">
              <ProductTable :products="products" />
            </div>  
            <div class="flex flex-col p-2" >
              <div class="flex items-center gap-2">
                <p class="text-sm text-gray-500">Rows per page</p>
                <Select>
                  <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">
                        Apple
                      </SelectItem>
                      <SelectItem value="banana">
                        Banana
                      </SelectItem>
                      <SelectItem value="blueberry">
                        Blueberry
                      </SelectItem>
                      <SelectItem value="grapes">
                        Grapes
                      </SelectItem>
                      <SelectItem value="pineapple">
                        Pineapple
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="ml-auto">
                <Pagination v-slot="{ page }" :items-per-page="10" :total="10000" :sibling-count="1" show-edges :default-page="2">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                  <PaginationFirst />
                  <PaginationPrev />

                  <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                      <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                        {{ item.value }}
                      </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                  </template>

                  <PaginationNext />
                  <PaginationLast />
                </PaginationList>
              </Pagination>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>


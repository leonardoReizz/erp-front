<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, PackageIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryStore } from "@/store/useCategoryStore";

const { categories } = useCategoryStore();
</script>

<template>
  <div class="flex h-screen w-full">
    <Sidebar />
    <div class="flex flex-col h-full w-full bg-gray-100 overflow-y-auto">
      <Navbar />
      <div class="flex flex-col gap-4 p-4 w-full h-full">
        <div class="flex justify-between items-center gap-4 p-1">
          <div>
            <h3 class="text-2xl font-bold">Create Product</h3>
            <p class="text-sm text-gray-500">Create new product</p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCwIcon />
            </Button>
            <Button>
              <CirclePlusIcon />
              Add Product
            </Button>
          </div>
        </div>
        <form class="space-y-4">
        <Card class="w-full p-0">
          <CardHeader class="border-b">
            <CardTitle class="flex items-center gap-2"><AlertCircleIcon class="text-orange-500" /> Product Information</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4 p-4">
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="name"
                >
                  <FormItem class="w-full" >
                    <FormLabel>Product Name<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Name"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="sku"
                >
                  <FormItem class="w-full">
                    <FormLabel>SKU<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SKU"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="categoryId"
                >
                  <FormItem class="w-full">
                    <FormLabel>Category<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="barcode"
                >
                  <FormItem class="w-full">
                    <FormLabel>Barcode<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789012"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="description"
                >
                  <FormItem class="w-full">
                    <FormLabel>Description<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product Description"
                        v-bind="componentField"
                        class="resize-none min-h-[100px]"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            
          </CardContent>
        </Card>
        <Card class="w-full p-0">
          <CardHeader class="border-b">
            <CardTitle class="flex items-center gap-2"><PackageIcon class="text-green-500" /> Princing & Stocks</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4 p-4">
            <div class="flex gap-4 w-full">
              <FormField
                v-slot="{ componentField }"
                name="name"
              >
                <FormItem class="w-full">
                  <FormLabel>Quantity<span class="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>  
              <FormField
                v-slot="{ componentField }"
                name="purchasePrice"
              >
                <FormItem class="w-full">
                  <FormLabel>Purchase Price<span class="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$20.00"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField
                v-slot="{ componentField }"
                name="salePrice"
              >
                <FormItem class="w-full">
                  <FormLabel>Sale Price<span class="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$25.00"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </CardContent>
        </Card>
        <div class="flex gap-4 w-full justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Add Product</Button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>


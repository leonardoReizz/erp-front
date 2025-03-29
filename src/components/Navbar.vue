<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ComputerIcon, CirclePlusIcon, UserIcon, SettingsIcon } from "lucide-vue-next";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
</script>

<template>
  <div class="flex bg-white border-b w-full h-[60px] justify-between items-center p-4">
    <!-- <div class="flex w-full">
      <Input type="text" placeholder="Search" />
    </div> -->
    <div class="flex gap-2 ml-auto">
      <ul class="flex gap-2">
        <li>
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
        </li>
        <li>
          <Button>
            <CirclePlusIcon class="!size-4" /> 
            Add New
          </Button>
        </li>
        <li class="border-r pr-2">
          <Button>
            <ComputerIcon class="!size-4" /> 
            Post
          </Button>
        </li>
        <li>
          <Button size="icon" variant="outline">
            <SettingsIcon class="!size-4" /> 
          </Button>
        </li>
        <li>
          <Button size="icon" variant="outline">
            <UserIcon class="!size-4" /> 
          </Button>
        </li>
      </ul>
    </div>
  </div>
</template>


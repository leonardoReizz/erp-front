<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings, PlusCircle, ShoppingBag } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Produtos",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Servicos",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Fornecedores",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Clientes",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Transportadores",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Vendedores",
    url: "product",
    icon: Inbox,
  },
  {
    title: "Categorias",
    url: "customer",
    icon: Calendar,
  },
];

</script>

<template>
  <Sidebar>
    <SidebarHeader class="border-b">
      <div class="flex items-center gap-2 h-[43px] px-2">
        <ShoppingBag class="text-orange-500" />
        <h3 class="text-lg font-bold">POS</h3>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <RouterLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
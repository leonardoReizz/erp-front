<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MailIcon, LockIcon } from "lucide-vue-next";
import { useLoginStore } from "@/store/useLoginStore";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { GoogleLogin } from 'vue3-google-login'
const {handleLogin, loading, handleGoogleLogin} = useLoginStore();
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-muted">
    <Card class="w-full max-w-[80%] h-full max-h-[80%]">
      <CardContent class="flex gap-4 p-0 h-full">
        <div class="w-1/2 p-8 space-y-4 flex items-center justify-center flex-col">
          <div class="w-full max-w-sm space-y-8">
            <CardHeader class="p-0">
              <CardTitle class="text-2xl font-bold">Login in to your Account</CardTitle>
              <CardDescription class="text-sm text-muted-foreground">Welcome back! Select your preferred login method:</CardDescription>
            </CardHeader>
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <GoogleLogin :callback="handleGoogleLogin" class="w-full"  />
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-[1px] bg-muted"></div>
                <span class="text-muted-foreground text-sm">or continue with email</span>
                <div class="flex-1 h-[1px] bg-muted"></div>
              </div>
              <form @submit.prevent="handleLogin" class=" flex flex-col gap-4">
                <FormField
                  v-slot="{ componentField }"
                  name="email"
                >
                  <FormItem class="relative">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        v-bind="componentField"
                        class="pl-8"
                      />
                      <MailIcon class="!size-5 absolute  top-2.5 -translate-y-1/2 left-2 text-muted-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="password"
                >
                  <FormItem class="relative">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        v-bind="componentField"
                        type="password"
                        class="pl-8"
                      />
                      <LockIcon class="!size-5 absolute  top-2.5 -translate-y-1/2 left-2 text-muted-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <div class="flex justify-between items-center ">
                  <FormField
                    v-slot="{ componentField }"
                    name="remember"
                  >
                    <FormItem class="flex items-center gap-2 ">
                      <FormControl>
                        <Checkbox
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormLabel class="!mt-0">Remember me</FormLabel>
                  
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <RouterLink to="/" class="text-sm text-primary hover:underline">Forgot your password?</RouterLink>
                </div>
                <Button type="submit" :disabled="loading" class="w-full mt-4">
                  <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                  Login
                </Button>
              </form>
            </div>
            <div class="text-center mt-8 text-sm text-muted-foreground">
              <RouterLink to="/register">
               Dont have an account?
                <span class="text-primary hover:underline"> Create an account</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="w-1/2 bg-primary rounded-r-xl p-4 flex items-center justify-center flex-col">
          <div>
            <img src="@/assets/login-image.png" alt="Login Image" class="mx-auto w-full h-full object-cover rounded-xl max-w-[80%]">
          </div>
          <div class="flex items-center flex-col">
            <h5 class="text-xl font-bold text-white">Connect with every application</h5>
            <p class="text-muted-foreground text-sm text-gray-200">Everything you need in an easily customizable dashboard</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
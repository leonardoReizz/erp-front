<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { MailIcon, UserIcon, LockIcon } from "lucide-vue-next";
import { useRegisterStore } from "@/store/useRegisterStore";
import { GoogleLogin } from 'vue3-google-login'

const {handleRegister, loading, handleGoogleRegister} = useRegisterStore();
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-muted">
    <Card class="w-full max-w-[80%] h-full max-h-[80%]">
      <CardContent class="flex gap-4 p-0 h-full">
        <div class="w-1/2 p-8 space-y-4 flex items-center justify-center flex-col">
          <div class="w-full max-w-sm space-y-8">
            <CardHeader class="p-0">
              <CardTitle class="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription class="text-sm text-muted-foreground">Welcome! Create an account to get started</CardDescription>
            </CardHeader>
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <GoogleLogin :callback="handleGoogleRegister" class="w-full"  />
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-[1px] bg-muted"></div>
                <span class="text-muted-foreground text-sm">or continue with email</span>
                <div class="flex-1 h-[1px] bg-muted"></div>
              </div>
              <form @submit.prevent="handleRegister" class=" flex flex-col gap-4">
                <FormField
                  v-slot="{ componentField }"
                  name="name"
                >
                  <FormItem class="relative">
                    <FormControl >
                      <Input
                        placeholder="Your Name"
                        class="pl-8"
                        v-bind="componentField"
                      />
                      <UserIcon class="!size-5 absolute  top-2.5 -translate-y-1/2 left-2 text-muted-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="email"
                >
                  <FormItem class="relative">
                    <FormControl >
                      <Input
                        type="email"
                        placeholder="Email"
                        class="pl-8"
                        v-bind="componentField"
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
                        placeholder="Confirm Password"
                        v-bind="componentField"
                        type="password"
                        class="pl-8"
                      />
                      <LockIcon class="!size-5 absolute  top-2.5 -translate-y-1/2 left-2 text-muted-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="confirmPassword"
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
                <Button type="submit" :disabled="loading" class="w-full mt-4">
                  <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                  Register
                </Button>
              </form>
            </div>
            <div class="text-center mt-8 text-sm text-muted-foreground">
              <RouterLink to="/">
               Already have an account?
                <span class="text-primary hover:underline"> Login</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="w-1/2 bg-primary rounded-r-xl p-4 flex items-center justify-center flex-col">
          <div >
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
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, TruckIcon, UserIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContactStore } from "@/features/Contact/store/useCreateContactStore";

const { form, handleSubmit } = useCreateContactStore();
</script>

<template>
  <div class="flex h-screen w-full">
    <Sidebar />
    <div class="flex flex-col h-full w-full bg-gray-100 overflow-y-auto">
      <Navbar />
      <div class="flex flex-col gap-4 p-4 w-full h-full">
        <div class="flex justify-between items-center gap-4 p-1">
          <div>
            <h3 class="text-2xl font-bold">Create Customer</h3>
            <p class="text-sm text-gray-500">Create new customers</p>
          </div>
        </div>
        <form class="space-y-4 relative w-full z-10" @submit.prevent="handleSubmit">
          <Card class="w-full p-0">
            <CardHeader class="border-b">
              <CardTitle class="flex items-center gap-2">
                <AlertCircleIcon class="text-orange-500" /> 
                Informacoes
              </CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-4 p-4">
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="name"
                >
                  <FormItem class="w-full" >
                    <FormLabel>Nome<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome ou Razao Social"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="fantasy"
                >
                  <FormItem class="w-full" >
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input
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
                  name="personType"
                >
                  <FormItem class="w-full">
                    <FormLabel>Tipo de Pessoa</FormLabel>
                    <FormControl>
                      <Select v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="LEGAL">
                              Pessoa Juridica
                            </SelectItem>
                            <SelectItem value="PHYSICAL">
                              Pessoa Fisica
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  :name="form.values.personType === 'LEGAL' ? 'cnpj' : 'cpf'"
                >
                  <FormItem class="w-full">
                    <FormLabel>{{ form.values.personType === 'LEGAL' ? 'CNPJ' : 'CPF' }}</FormLabel>
                    <FormControl>
                      <Input
                        :placeholder="form.values.personType === 'LEGAL' ? 'CNPJ' : 'CPF'"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField
                  v-if="form.values.personType === 'PHYSICAL'"
                  v-slot="{ componentField }"
                  name="rg"
                >
                  <FormItem class="w-full">
                    <FormLabel>RG<span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="RG"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                v-if="form.values.personType === 'LEGAL'"
                  v-slot="{ componentField }"
                  name="contribuinte"
                >
                  <FormItem class="w-full">
                    <FormLabel>Contribuinte</FormLabel>
                    <FormControl>
                      <Select v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="LEGAL">
                              0 - Nao Informado
                            </SelectItem>
                            <SelectItem value="PHYSICAL">
                              1 - Contribuinte ICMS
                            </SelectItem>
                            <SelectItem value="PHYSICAL">
                              2 - Contribuinte isento de Inscricao no cadastro de Contribuintes do ICMS
                            </SelectItem>
                            <SelectItem value="PHYSICAL">
                              9 - Nao Contribuinte, que pode ou nao possuir Inscricao Estadual de Contribuintes do ICMS
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
                  name="stateRegistration"
                >
                  <FormItem class="w-full flex flex-col">
                    <FormLabel>Inscricao Estadual</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="municipalRegistration"
                >
                  <FormItem class="w-full flex flex-col">
                    <FormLabel>Inscricao Municipal</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Descricao</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descricao"
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
              <CardTitle class="flex items-center gap-2">
                <TruckIcon class="text-orange-500" /> 
                Informacoes de Endereco
              </CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-4 p-4">
             
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="zipCode"
                >
                  <FormItem class="w-full">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="addressInfo.address"
                >
                  <FormItem class="w-full">
                    <FormLabel>Endereco</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street, 2000, Avenue"
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
                  name="addressInfo.city"
                >
                  <FormItem class="w-full">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="addressInfo.state"
                >
                  <FormItem class="w-full">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Select v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="SUPPLIER">
                              Fornecedor
                            </SelectItem>
                            <SelectItem value="CLIENT">
                              Cliente
                            </SelectItem>
                            <SelectItem value="TRANSPORT">
                              Transportador
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
                  name="addressInfo.neighborhood"
                >
                  <FormItem class="w-full">
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>  
                <FormField
                  v-slot="{ componentField }"
                  name="addressInfo.addressNumber"
                >
                  <FormItem class="w-full">
                    <FormLabel>Numero</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="addressInfo.addressComplement"
                >
                  <FormItem class="w-full">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
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
              <CardTitle class="flex items-center gap-2">
                <UserIcon class="text-orange-500" /> 
                Informacoes de Contato
              </CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-4 p-4">
             
              <div class="flex gap-4 w-full">
                <FormField
                  v-slot="{ componentField }"
                  name="contactInfo.phone"
                >
                  <FormItem class="w-full">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="contactInfo.phoneTwo"
                >
                  <FormItem class="w-full">
                    <FormLabel>Telefone Adicional</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="contactInfo.cellPhone"
                >
                  <FormItem class="w-full">
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street, 2000, Avenue"
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
                  name="contactInfo.email"
                >
                  <FormItem class="w-full">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
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
                  name="contactInfo.observation"
                >
                  <FormItem class="w-full">
                    <FormLabel>Observacoes</FormLabel>
                    <FormControl>
                      <Textarea
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
          <div class="flex gap-4 w-full justify-end fixed bottom-0 left-0 bg-white p-4 border-t">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :initialValues
      :resolver
      :validateOnValueUpdate="false"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex m-2 gap-4">
        <SelectButton
          name="NeedUsername"
          :options="[
            { name: 'Sim', value: true },
            { name: 'Não', value: false },
          ]"
          optionLabel="name"
          optionValue="value"
          :allowEmpty="false"
          class="border"
          size="large"
        />

        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.username.error?.message }}
        </Message>
      </div>
      <Sh3Button type="submit" severity="secondary" label="Submit" />
      <pre class="whitespace-pre-wrap">{{ $form }}</pre>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

import * as yup from "yup";
import { z } from "zod";

const toast = useToast();

const initialValues = reactive({
  NeedUsername: false,
  username: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }

  return {
    errors,
  };
};
const schema = {
  zod: z.object({
    username: z.string().min(1, { message: "Username is required via Zod." }),
  }),
  yup: yup.object().shape({
    username: yup.string().required("Username is required via Yup."),
  }),
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

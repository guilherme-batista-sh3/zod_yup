<template>
  <Sh3Button
    @click="schemaValue = 'zod'"
    label="Validar com Zod"
    class="border-2 mx-2"
    :disabled="schemaValue == 'zod'"
  />
  <Sh3Button
    @click="schemaValue = 'yup'"
    label="Validar com Yup"
    class="border-2 mx-2"
    :disabled="schemaValue == 'yup'"
  />
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :initialValues
      :resolver
      :validateOnValueUpdate="false"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col m-2 gap-4">
        <div class="flex items-center gap-2">
          <Checkbox name="TextObrigatorio" binary /> Texto?
          <InputText name="Texto" type="text" placeholder="texto" fluid />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox name="ValorObrigatorio" binary /> Numero?
          <InputText name="Valor" type="number" placeholder="valor" fluid />
          <p v-if="$form.ValorObrigatorio?.value">
            Regras: Numero inteiro maior que 0
          </p>
        </div>
        <Message
          v-for="fields of Object.keys($form).filter(
            (field) => $form[field].errors?.length > 0
          )"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ fields }}:
          <p v-for="errors of $form[fields].errors">{{ errors.message }}</p>
        </Message>
      </div>
      <Sh3Button
        ref="submitButton"
        id="submitButton"
        type="submit"
        severity="secondary"
        label="Submit"
        class="mx-2"
      />
      <Sh3Button
        @click="testar($form)"
        label="Teste submit x100"
        class="w-40 m-auto"
      />
      <pre class="whitespace-pre-wrap">{{ $form }}</pre>
    </Form>
  </div>
  <Toast />
</template>

<script setup>
import { ref, watch } from "vue";

import { useToast } from "primevue/usetoast";

import { yupResolver } from "@primevue/forms/resolvers/yup";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import * as yup from "yup";
import { z } from "zod";

const toast = useToast();
const schemaValue = ref("zod");

const initialValues = ref({
  TextObrigatorio: false,
  ValorObrigatorio: false,
});

// Schemas
const zodSchema = z
  .object({
    TextObrigatorio: z.boolean({ message: "Valor deve ser Boolean." }),
    Texto: z.string().optional(),
    ValorObrigatorio: z.boolean({ message: "Valor deve ser Boolean." }),
    Valor: z.coerce
      .number({ message: "Valor deve ser numérico" })
      .int()
      .nonnegative()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.TextObrigatorio) {
      if (data.Texto == "")
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Texto é obrigatorio",
        });
    }
    if (data.ValorObrigatorio) {
      if (!data.Valor || data.Valor == "")
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Valor é obrigatorio",
        });
    }
  });
const yupSchema = yup.object({
  TextObrigatorio: yup.boolean("Valor deve ser Boolean."),
  Texto: yup.string().when("TextObrigatorio", {
    is: true,
    then: (schema) => schema.required("Texto é obrigatorio"),
  }),
  ValorObrigatorio: yup.boolean("Valor deve ser Boolean."),
  Valor: yup
    .number()
    .min(0)
    .integer()
    .when("ValorObrigatorio", {
      is: true,
      then: (schema) => schema.required("Valor é obrigatorio"),
    }),
});
const schema = {
  zod: zodResolver(zodSchema),
  zodTemp: async ({ values }) => {
    console.log(values);
    console.log(await zodSchema.safeParseAsync(values));
    return (await zodSchema.safeParseAsync(values)).data;
  },
  yup: yupResolver(yupSchema),
};
const resolver = ref(schema[schemaValue.value]);

watch(schemaValue, (newSchema) => {
  resolver.value = schema[newSchema];
});

const onFormSubmit = (event) => {
  console.log("submited Data", event.values);
  if (event.valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error.",
      life: 3000,
    });
  }
};
const testar = (data) => {
  let values = {};
  for (let filter of Object.keys(data).filter(
    (x) => typeof data[x] == "object"
  ))
    values[filter] = data[filter].value;

  const start = performance.now();

  for (let i = 0; i < 100; i++) {
    if (schemaValue.value == "zod") {
      zodSchema.safeParse(values);
    } else {
      yupSchema.validate(values);
    }
  }
  // document.getElementById("submitButton").click();

  const end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
};
</script>

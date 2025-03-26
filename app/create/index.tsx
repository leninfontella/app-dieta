import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { colors } from "../../constants/colors";
import { Header } from "@/app-example/components/header";
import { Select } from "../../app-example/components/input/select";
import { useDataStore } from "../../store/data";
import { router } from "expo-router";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  objective: z.string().min(1, { message: "O Objetivo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione seu nível" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    { label: "Sedentário", value: "Sedentário" },
    { label: "Levemente ativo", value: "Levemente ativo" },
    { label: "Moderadamente ativo", value: "Moderadamente ativo" },
    { label: "Altamente ativo", value: "Altamente ativo" },
  ];

  const objectiveOptions = [
    { label: "Emagrecer", value: "Emagrecer" },
    { label: "Hipertrofia", value: "Hipertrofia" },
    { label: "Hipertrofia + Definição", value: "Hipertrofia + Definição" },
    { label: "Definição", value: "Definição" },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    });

    router.push("./nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione o nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o seu nível de atividade física..."
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>Selecione o seu objetivo</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione o seu nível objetivo..."
          error={errors.objective?.message}
          options={objectiveOptions}
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },

  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

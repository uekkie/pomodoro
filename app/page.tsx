import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormType = {
  title: string
}
export default function Home() {
  const form = useForm<FormType>({
    defaultValues: {
      title: "",
    },
  })
  return (
    <main>
      <Input />
    </main>
  );
}

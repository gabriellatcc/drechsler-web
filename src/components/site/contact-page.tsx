import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactStore } from "@/generated/api/contact/contact";
import { toastApiError, toastApiSuccess } from "@/lib/api-toast";
import { CONTACT, whatsappUrl } from "@/lib/site-content";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo.").max(255),
  email: z.string().email("Informe um e-mail válido.").max(255),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(255).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Descreva sua mensagem com pelo menos 10 caracteres.")
    .max(5000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const { mutate, isPending } = useContactStore({
    mutation: {
      onSuccess: (data) => {
        toastApiSuccess(data, "Mensagem enviada com sucesso!");
        form.reset();
      },
      onError: (error) => {
        toastApiError(error, "Não foi possível enviar a mensagem");
      },
    },
  });

  function onSubmit(values: ContactFormValues) {
    mutate({
      data: {
        name: values.name,
        email: values.email,
        message: values.message,
        phone: values.phone || undefined,
        company: values.company || undefined,
      },
    });
  }

  return (
    <>
      <section className="py-10 md:py-14 bg-secondary-foreground">
        <div className="site-container grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Canais de contato</CardTitle>
                <CardDescription>Escolha a forma mais conveniente para você</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {CONTACT.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="size-3.5 shrink-0" />
                    {email}
                  </a>
                ))}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle className="size-3.5 shrink-0" />
                  WhatsApp: {CONTACT.whatsapp}
                </a>
              </CardContent>
            </Card>

            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={whatsappUrl("Olá! Gostaria de falar com a equipe DRECHSLER.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Conversar no WhatsApp
              </a>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulário de contato</CardTitle>
              <CardDescription>Preencha os campos abaixo para enviar sua mensagem</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" autoComplete="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(12) 99999-9999" autoComplete="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Sua empresa" autoComplete="organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva como podemos ajudar..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                    {isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar mensagem"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

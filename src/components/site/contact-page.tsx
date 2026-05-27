import { Loader2, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactMe } from "@/generated/api/contact/contact";
import type { ContactMe200 } from "@/generated/api/models/contactMe200";
import type { ContactMeBody } from "@/generated/api/models/contactMeBody";
import { toastApiError, toastApiSuccess } from "@/lib/api-toast";
import { CONTACT } from "@/lib/site-content";

const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo.").max(255),
  email: z.string().email("Informe um e-mail válido.").max(255),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(10, "Descreva sua mensagem com pelo menos 10 caracteres.").max(5000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutate, isPending } = useContactMe({
    mutation: {
      onSuccess: (data: ContactMe200) => {
        toastApiSuccess(data);
        form.reset();
      },
      onError: (error: unknown) => {
        toastApiError(error);
      },
    },
  });

  function onSubmit(values: ContactFormValues) {
    const body: ContactMeBody = {
      name: values.name,
      email: values.email,
      phone: values.phone ?? "",
      company: "",
      message: values.message,
    };
    mutate({ data: body });
  }

  return (
    <section className="section-padding bg-background">
      <div className="site-container grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Formulário de contato</CardTitle>
            <CardDescription>Dúvidas ou sugestões? Envie-nos uma mensagem</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome Completo" autoComplete="name" {...field} />
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
                      <FormControl>
                        <Input type="email" placeholder="E-mail" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="tel" placeholder="Telefone" autoComplete="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Mensagem" rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="outline" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4 pt-2">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Contatos Rápidos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">

              Escolha a forma mais conveniente para você
            </p>
          </div>

          <div className="divide-y divide-border">
            {CONTACT.whatsapp  && (
              <a
                key={CONTACT.whatsapp}
                href={`tel:${CONTACT.whatsapp}`}
                className="flex items-start gap-3 py-3 text-sm text-foreground hover:text-muted-foreground transition-colors"
              >
                <Phone className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                {CONTACT.whatsapp}
              </a>
            )}

            {CONTACT.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="flex items-start gap-3 py-3 text-sm text-foreground hover:text-muted-foreground transition-colors"
              >
                <Mail className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                {email}
              </a>
            ))}

            {/**
            {CONTACT.address && (
              <div className="flex items-start gap-3 py-3 text-sm text-foreground">
                <MapPin className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>{CONTACT.address}</span>
              </div>
            )}
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
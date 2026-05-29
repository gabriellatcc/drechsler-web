import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { useSiteAccessGate } from "@/components/providers/site-access-gate-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifySiteGatePassword } from "@/lib/site-access-gate";

export function SiteAccessGateScreen() {
  const { unlock } = useSiteAccessGate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!password) {
      setError("Informe a senha enviada por e-mail.");
      return;
    }

    if (!verifySiteGatePassword(password)) {
      setError("Senha incorreta. Verifique o e-mail e tente novamente.");
      return;
    }

    unlock();
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted text-primary">
            <Lock className="size-6" aria-hidden />
          </div>
          <CardTitle>Acesso restrito</CardTitle>
          <CardDescription>
            Acesso restrito ao administrador, digite a senha encaminhada por e-mail para
            liberar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-gate-password">Senha</Label>
              <div className="relative">
                <Input
                  id="site-gate-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              Liberar acesso
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

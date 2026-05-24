import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-content";

export function HomeHeroActions() {
  return (
    <div className="flex flex-wrap justify-center gap-2 pt-1">
      <Button asChild size="lg">
        <Link to="/servicos">
          Conheça nossos serviços
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a
          href={whatsappUrl("Olá! Gostaria de saber mais sobre os serviços da DRECHSLER.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-4" />
          Fale no WhatsApp
        </a>
      </Button>
    </div>
  );
}

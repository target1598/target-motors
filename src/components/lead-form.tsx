import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";

export function LeadForm({ defaultModel = "" }: { defaultModel?: string }) {
  const { t, lang } = useLanguage();
  const [interest, setInterest] = useState("buy");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const model = String(data.get("model") || defaultModel);
    const message = String(data.get("message") || "");
    const line =
      lang === "he"
        ? `שלום, אני ${name}, טלפון ${phone}. מעניין אותי ${model}. ${message}`
        : `Hi, I'm ${name}, phone ${phone}. Interested in ${model}. ${message}`;
    toast.success(t.form.sent);
    window.open(whatsappHref(line), "_blank", "noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">{t.form.name}</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone">{t.form.phone}</Label>
        <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">{t.form.email}</Label>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="model">{t.form.model}</Label>
        <Input id="model" name="model" defaultValue={defaultModel} />
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">{t.form.interest}</legend>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "buy", label: t.form.buy },
            { id: "finance", label: t.form.finance },
            { id: "lease", label: t.form.lease },
          ].map((item) => (
            <label
              key={item.id}
              className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${
                interest === item.id ? "border-brand bg-brand text-accent-foreground" : "border-rule bg-mist text-ink"
              }`}
            >
              <input
                type="radio"
                name="interest"
                value={item.id}
                className="sr-only"
                checked={interest === item.id}
                onChange={() => setInterest(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-1.5">
        <Label htmlFor="message">{t.form.message}</Label>
        <Textarea id="message" name="message" />
      </div>
      <label className="flex items-start gap-3 text-sm text-quiet">
        <input type="checkbox" required className="mt-1 size-4 accent-[var(--color-brand)]" />
        {t.form.consent}
      </label>
      <Button type="submit">{t.form.send}</Button>
    </form>
  );
}

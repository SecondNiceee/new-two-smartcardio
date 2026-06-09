"use client"

import { useState, type ReactNode, type FormEvent } from "react"
import { Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function QuestionDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTimeout(() => {
        setSubmitted(false)
        setConsent(true)
      }, 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">Спасибо за обращение!</DialogTitle>
            <DialogDescription className="text-pretty">
              Мы свяжемся с вами в ближайшее время по указанному номеру.
            </DialogDescription>
            <Button className="mt-2" onClick={() => handleOpenChange(false)}>
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Задать вопрос</DialogTitle>
              <DialogDescription className="text-center">
                Оставьте свои контакты, и мы ответим на ваш вопрос
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="question-name">Ваше имя:</Label>
                <Input id="question-name" name="name" placeholder="Иван" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="question-phone">
                  Телефон для связи: <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="question-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="question-consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="question-consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                  Даю согласие на обработку персональных данных
                </Label>
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full" disabled={!consent}>
                  Отправить
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

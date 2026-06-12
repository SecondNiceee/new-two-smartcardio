"use client"

import { useState, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { StepBar } from "@/components/cdek/step-bar"
import { StepForm } from "@/components/cdek/step-form"
import { DeliveryTypePicker } from "@/components/cdek/delivery-type-picker"
import { StepPvz } from "@/components/cdek/step-pvz"
import { StepCourier } from "@/components/cdek/step-courier"
import { StepConfirm } from "@/components/cdek/step-confirm"
import { StepSuccess } from "@/components/cdek/step-success"
import type { FormData, PvzLocation, CourierLocation, DeliveryType, Step } from "@/components/cdek/types"

// ─── Constants ────────────────────────────────────────────────────────────────

const DEVICE_PRICE = 15600   // цена прибора (платит покупатель)
const COMMISSION = 0.06      // комиссия СДЭК 6%
const SELLER_AMOUNT = Math.round(DEVICE_PRICE * (1 - COMMISSION) * 100) / 100

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  cityCode: "",
  regionCode: 0,
  comment: "",
  consent: true,
}

const STEP_TITLE: Partial<Record<Step, string>> = {
  form: "Оформление заказа",
  "delivery-type": "Способ доставки",
  pvz: "Выберите пункт выдачи",
  courier: "Адрес доставки",
  confirm: "Подтверждение заказа",
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CdekOrderDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("form")
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [deliveryType, setDeliveryType] = useState<DeliveryType | null>(null)
  const [selectedPvz, setSelectedPvz] = useState<PvzLocation | null>(null)
  const [courierLocation, setCourierLocation] = useState<CourierLocation | null>(null)
  const [deliverySum, setDeliverySum] = useState(0)
  const [deliveryTariffCode, setDeliveryTariffCode] = useState(136)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [orderUuid, setOrderUuid] = useState<string | null>(null)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTimeout(() => {
        setStep("form")
        setFormData(INITIAL_FORM)
        setDeliveryType(null)
        setSelectedPvz(null)
        setCourierLocation(null)
        setDeliverySum(0)
        setDeliveryTariffCode(136)
        setSubmitting(false)
        setSubmitError(null)
        setOrderUuid(null)
      }, 300)
    }
  }

  function handleDeliveryTypeNext() {
    if (!deliveryType) return
    setStep(deliveryType)
  }

  async function handleSubmitOrder() {
    setSubmitting(true)
    setSubmitError(null)

    const deliveryCost = Math.round(deliverySum * 100) / 100

    const basePayload = {
      tariff_code: deliveryTariffCode,
      sum: DEVICE_PRICE,
      delivery_recipient_cost: { value: deliveryCost },
      sender: {
        name: "СмартКардио",
        phones: [{ number: "+74951234567" }],
      },
      recipient: {
        name: formData.name,
        phones: [{ number: formData.phone }],
        ...(formData.email ? { email: formData.email } : {}),
      },
      packages: [
        {
          number: "1",
          weight: 500,
          length: 33,
          width: 24,
          height: 5,
          items: [
            {
              name: "СмартКардио® прибор",
              ware_key: "SMARTCARDIO-001",
              payment: { value: DEVICE_PRICE, vat_sum: 0, vat_rate: 0 },
              cost: SELLER_AMOUNT,
              weight: 500,
              amount: 1,
            },
          ],
        },
      ],
      ...(formData.comment ? { comment: formData.comment } : {}),
    }

    // Append delivery-type-specific fields
    const deliveryFields =
      deliveryType === "pvz" && selectedPvz
        ? { delivery_point: selectedPvz.code }
        : {
            to_location: {
              code: Number(formData.cityCode),
              address: courierLocation?.address ?? "",
            },
          }

    try {
      const res = await fetch("/api/cdek/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...basePayload, ...deliveryFields }),
      })

      const json = (await res.json()) as { uuid?: string; error?: string }

      if (!res.ok || json.error) {
        setSubmitError(json.error ?? "Неизвестная ошибка при создании заказа")
        return
      }

      setOrderUuid(json.uuid ?? "")
      setStep("confirm") // guarded by orderUuid below
    } catch {
      setSubmitError("Ошибка соединения с сервером. Попробуйте ещё раз.")
    } finally {
      setSubmitting(false)
    }
  }

  const isSuccess = step === "confirm" && orderUuid !== null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        {isSuccess ? (
          <StepSuccess uuid={orderUuid!} onClose={() => handleOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {STEP_TITLE[step] ?? "Оформление заказа"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Оформление заказа СмартКардио® через СДЭК
              </DialogDescription>
            </DialogHeader>

            <StepBar step={step} />

            <div className="mt-1">
              {step === "form" && (
                <StepForm
                  data={formData}
                  onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
                  onNext={() => setStep("delivery-type")}
                />
              )}

              {step === "delivery-type" && (
                <DeliveryTypePicker
                  selected={deliveryType}
                  onSelect={setDeliveryType}
                  onBack={() => setStep("form")}
                  onNext={handleDeliveryTypeNext}
                />
              )}

              {step === "pvz" && (
                <StepPvz
                  cityCode={formData.cityCode}
                  regionCode={formData.regionCode}
                  cityName={formData.city}
                  selectedPvz={selectedPvz}
                  onSelect={setSelectedPvz}
                  onBack={() => setStep("delivery-type")}
                  onNext={(sum) => {
                    setDeliverySum(sum)
                    setDeliveryTariffCode(136)
                    setStep("confirm")
                  }}
                />
              )}

              {step === "courier" && (
                <StepCourier
                  cityCode={formData.cityCode}
                  cityName={formData.city}
                  courierLocation={courierLocation}
                  onChange={setCourierLocation}
                  onBack={() => setStep("delivery-type")}
                  onNext={(sum, tariffCode) => {
                    setDeliverySum(sum)
                    setDeliveryTariffCode(tariffCode)
                    setStep("confirm")
                  }}
                />
              )}

              {step === "confirm" && !isSuccess && (
                <StepConfirm
                  data={formData}
                  deliveryType={deliveryType ?? "pvz"}
                  pvz={selectedPvz}
                  courierLocation={courierLocation}
                  onBack={() => setStep(deliveryType ?? "pvz")}
                  onSubmit={handleSubmitOrder}
                  loading={submitting}
                  error={submitError}
                />
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

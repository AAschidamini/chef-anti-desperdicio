"use client";

import { useState, type FormEvent } from "react";
import { useReservations } from "@/application/hooks/use-reservations";
import { Card } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import type { Reservation } from "@/domain/entities/reservation";

const statusTone: Record<Reservation["status"], "success" | "warning" | "danger" | "neutral"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "neutral",
};

const statusLabel: Record<Reservation["status"], string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Concluída",
};

export function ReservationsView() {
  const { reservations, isLoading, error, createReservation, cancelReservation } =
    useReservations();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      await createReservation({
        customerName,
        customerPhone,
        partySize,
        date,
        time,
      });
      setCustomerName("");
      setCustomerPhone("");
      setPartySize(2);
      setDate("");
      setTime("");
    } catch {
      setFormError("Não foi possível criar a reserva.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Reservas</h1>
        <p className="text-sm text-neutral-500">
          Gerencie as reservas de mesas do restaurante.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Nova reserva
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nome do cliente"
              name="customerName"
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
            <Input
              label="Telefone"
              name="customerPhone"
              required
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
            />
            <Input
              label="Número de pessoas"
              type="number"
              name="partySize"
              min={1}
              required
              value={partySize}
              onChange={(event) => setPartySize(Number(event.target.value))}
            />
            <Input
              label="Data"
              type="date"
              name="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <Input
              label="Horário"
              type="time"
              name="time"
              required
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <Button type="submit" isLoading={isSubmitting}>
              Reservar
            </Button>
          </form>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {isLoading && (
            <p className="text-sm text-neutral-500">Carregando reservas...</p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!isLoading && !error && reservations.length === 0 && (
            <Card className="text-sm text-neutral-500">
              Nenhuma reserva agendada.
            </Card>
          )}

          {reservations.map((reservation) => (
            <Card key={reservation.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">
                  {reservation.customerName} · {reservation.partySize} pessoa(s)
                </p>
                <p className="text-sm text-neutral-500">
                  {reservation.date} às {reservation.time} · {reservation.customerPhone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={statusTone[reservation.status]}>
                  {statusLabel[reservation.status]}
                </Badge>
                {reservation.status !== "cancelled" && (
                  <Button
                    variant="secondary"
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

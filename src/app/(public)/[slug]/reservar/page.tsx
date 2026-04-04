import Link from "next/link";
import { BookingForm } from "@/components/public/booking-form";

type ReservarPageProps = {
  params: Promise<{ slug: string }>;
};

const services = [
  { name: "Corte clasico", duration: "45 min", price: "$18" },
  { name: "Corte + barba", duration: "60 min", price: "$25" },
  { name: "Afeitado premium", duration: "30 min", price: "$15" },
];

const barbers = [
  { name: "Alejandro", role: "Master Barber" },
  { name: "Matias", role: "Fade Specialist" },
  { name: "Sergio", role: "Beard Artist" },
];

const availableDates = ["Lunes 6 de abril", "Martes 7 de abril", "Miercoles 8 de abril"];
const availableSlots = ["10:00", "11:30", "13:00", "15:30", "17:00", "18:30"];

export default async function ReservarPage({ params }: ReservarPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6">
      <BookingForm
        businessName={slug}
        services={services}
        barbers={barbers}
        availableDates={availableDates}
        availableSlots={availableSlots}
      />

      <Link
        href={`/${slug}`}
        className="inline-flex rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium transition hover:bg-black/5"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

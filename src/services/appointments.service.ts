export interface CreatePublicAppointmentPayload {
  id: string;
  customerId: string;
  serviceId: string;
  employeeId: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  channel: string;
  status: string;
  notes: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010/api";

export const AppointmentsService = {
  async createPublic(tenantId: string, payload: CreatePublicAppointmentPayload) {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": tenantId, 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("❌ ERROR DE VALIDACIÓN NESTJS:", errorData); 
      const errorMessage = Array.isArray(errorData?.message) 
        ? errorData.message.join(' | ') 
        : (errorData?.message || "Ocurrió un error al registrar la cita.");
        
      throw new Error(errorMessage);
    }

    return response.json();
  },
};

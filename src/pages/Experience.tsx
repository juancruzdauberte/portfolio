import { LiaSuitcaseSolid } from "react-icons/lia";

export const Experience = () => {
  return (
    <section id="experiencia" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <LiaSuitcaseSolid className="text-2xl" />
        <h3 className="text-xl font-semibold">Experiencia laboral</h3>
      </section>

      <section className="flex flex-col gap-32 mt-10 mx-4">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="">Reformam Network 2010 SL - Habitium MDF</h4>
            <span>Marzo 2024 - Diciembre 2024</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Atención al cliente y gestor de pedidos con distribuidores vía
              email. Creador de contenido en catálogo.
            </p>

            <ul className="list-disc list-inside space-y-1 mx-2">
              <li>Home Office.</li>
              <li>Gestión en incidencia de pedidos.</li>
              <li>Creador de contenido en catálogo.</li>
              <li>
                Comunicación con clientes, distribuidores y agencias de
                transporte.
              </li>
              <li>
                Trabajo en equipo mediante la plataforma Trello y Prestashop.
              </li>
            </ul>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="">Call Center - Siderman Law</h4>
            <span>Febrero 2025 - Actualmente</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>Asistente de atención al cliente vía telefónica</p>
            <ul className="list-disc list-inside space-y-1 mx-2">
              <li>Home Office.</li>
              <li>Comunicación clara y precisa con clientes.</li>
            </ul>
          </div>
        </section>
      </section>
    </section>
  );
};

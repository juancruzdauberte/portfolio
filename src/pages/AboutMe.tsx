import { FiUser } from "react-icons/fi";
import Cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { PiFilePdf } from "react-icons/pi";
import { StudiesCard } from "../layout/StudiesCard";
import { motion } from "framer-motion";
import { Technologies } from "../layout/Technologies";
export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiUser className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          Sobre Mí
        </h3>
      </section>

      <section className="flex flex-col gap-16 mx-4">
        <section className="flex flex-col gap-5 mt-3">
          <p>
            Mi nombre es Juan Cruz Dauberte, tengo 21 años y actualmente me
            encuentro estudiando la Licenciatura en Informática en la
            Universidad Nacional San Antonio de Areco (UNSAdA), donde estoy
            finalizando la Técnicatura. Además, estoy realizando la carrera de
            Desarrollador Web FullStack en CoderHouse. Tengo una gran pasión por
            la tecnología y el desarrollo de software. Me enfoco en el
            aprendizaje continuo, aplicando mis conocimientos en proyectos en
            los cuales estoy realizando. Estoy en búsqueda de contribuir a
            proyectos que impulsen mi desarrollo profesional y generen un
            impacto positivo dentro de la organización.
          </p>
          <div className="flex flex-col">
            <p className="text-xl text-blue-400 mb-1 dark:text-blue-200">
              Además...
            </p>
            <p>
              Me gusta mucho el deporte, me apasiona hacer actividades físicas.
              Jugar al fútbol con mis amigos, ir al gimnasio, jugar al pádel. En
              mi tiempo libre me gusta programar y pensar en ideas para realizar
              nuevos desafios y proyectos. Muchas gracias por tu tiempo!
            </p>
          </div>

          <div>
            <motion.a
              whileHover={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                scale: 1.03,
              }}
              transition={{ duration: 0.07 }}
              href={Cv}
              download={"Curriculum Vitae Juan Cruz Dauberte"}
              className="flex items-center gap-1 border rounded-full border-black p-0.5 w-40 md:w-48 justify-center  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
              rel="noopener noreferrer"
            >
              <PiFilePdf size={25} />
              Descargar Cv
            </motion.a>
          </div>
        </section>

        <section>
          <div>
            <h5 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              Mis estudios
            </h5>
          </div>

          <div className="flex flex-wrap gap-10 mt-3">
            <StudiesCard
              title="Analista en Informática"
              academy="Universidad Nacional San Antonio de Areco (UNSAdA)"
              timelaps="Febrero 2022 - Actualidad"
            />
            <StudiesCard
              title="Desarrollo Web"
              academy="Coderhouse"
              timelaps="Agosto 2024 - Octubre 2024"
              description="HTML - CSS - BOOTSTRAP - SASS - SEO - GIT - GITHUB"
              credentialUrl="https://pub.coderhouse.com/certificates/e308b2ba-a656-45eb-bf88-925ee34aa3dd?v=1"
            />
            <StudiesCard
              title="Javascript"
              academy="Coderhouse"
              timelaps="Octubre 2024 - Enero 2025"
              description="ASINCRONISMO - NODE JS - NPM - DOM - ARRAY - OBJETOS - FUNCIONES DE ORDEN SUPERIOR"
              credentialUrl="https://pub.coderhouse.com/certificates/46f837e2-56cf-4135-90a7-ed28201f888e?v=1"
            />
            <StudiesCard
              title="React JS"
              academy="Coderhouse"
              timelaps="Enero 2025 - Marzo 2025"
              description="HOOKS - ESTADOS - ROUTING - TAILWIND - FIRESTORE/FIREBASE"
              credentialUrl="https://pub.coderhouse.com/certificates/99644ed7-538e-477d-adbd-679770553ce8?v=1"
            />
            <StudiesCard
              title="Desarrollo Backend I"
              academy="Coderhouse"
              timelaps="Marzo 2025 - Actualidad"
              description="API REST - EXPRESS - MONGO DB - MONGOOSE - WEBSOCKETS - HANDLEBARS - ROUTER - MULTER"
            />
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <div>
            <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              Tecnologías & Herramientas
            </h4>
          </div>
          <Technologies />
        </section>
      </section>
    </section>
  );
};

import { FiUser } from "react-icons/fi";
import Cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { PiFilePdf } from "react-icons/pi";
import { StudiesCard } from "../layout/StudiesCard";
import { motion } from "framer-motion";
export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiUser className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          Sobre Mi
        </h3>
      </section>

      <section className="flex flex-col gap-16 mx-4">
        <section className="flex flex-col gap-5 mt-3">
          <p>
            Mi nombre es Juan Cruz Dauberte, tengo 21 años y actualmente me
            encuentro estudiando la Licenciatura en Informática en la
            Universidad Nacional San Antonio de Areco (UNSAdA), donde estoy
            finalizando la Técnicatura. Además, curso la carrera de
            Desarrollador Web FullStack en CoderHouse. Tengo una gran pasión por
            la tecnología y el desarrollo de software. Me enfoco en el
            aprendizaje continuo, aplicando mis conocimientos en proyectos
            reales. Estoy en busqueda de contribuir a proyectos que impulsen mi
            desarrollo profesional y generen un impacto positivo. Me gusta mucho
            el deporte, me apasiona hacer actividades físicas. Jugar al fútbol
            con mis amigos, ir al gimnasio, jugar un partido de padel. En mi
            tiempo libre me gusta programar y pensar en ideas para iniciar un
            nuevo proyecto. Muchas gracias por tu tiempo!
          </p>
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
          <div className="flex flex-wrap gap-2">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
              alt="TypeScript"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              alt="JavaScript"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
              alt="Java"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
              alt="Express"
              className="h-12"
            />
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926364/nodejsicon_dioqsc.png"
              alt="Node.js"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
              alt="MongoDB"
              className="h-12"
            />
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745927113/supabase-icon_w2upjk.png"
              alt="Supabase"
              className="h-12"
            />
            <img
              src="https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png"
              alt="Mongoose"
              className="w-16"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
              alt="PostgreSQL"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
              alt="MySQL"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
              alt="HTML"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
              alt="CSS"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
              alt="Bootstrap"
              className="h-12"
            />
            <img
              src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
              alt="Tailwind CSS"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              alt="React"
              className="h-12"
            />
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png"
              alt="Tanstack"
              className="h-12"
            />
            <img
              src="https://axios-http.com/assets/logo.svg"
              alt="Axios"
              className="h-12 w-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
              alt="Git"
              className="h-12"
            />
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926580/githubicon_om10uz.png"
              alt="GitHub"
              className="h-12"
            />
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926941/postman_inzdip.png"
              alt="Postman"
              className="h-14"
            />
            <img
              src="https://www.svgrepo.com/show/375433/firestore.svg"
              alt="Firestore"
              className="h-12"
            />
          </div>
        </section>
      </section>
    </section>
  );
};

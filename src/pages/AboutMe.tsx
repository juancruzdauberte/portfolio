import { FiUser } from "react-icons/fi";
import Cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { PiFilePdf } from "react-icons/pi";

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
            desarrollo profesional y generen un impacto positivo. Muchas gracias
            por tu tiempo!
          </p>
          <div>
            <a
              href={Cv}
              download={"Curriculum Vitae Juan Cruz Dauberte"}
              className="flex items-center gap-1 border rounded-full border-black p-0.5 w-40 md:w-48 justify-center  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
            >
              <PiFilePdf size={25} />
              Descargar Cv
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <section>
            <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              Tecnologías
            </h4>
          </section>
          <section className="flex flex-wrap gap-2">
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
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
              alt="Node.js"
              className="h-12"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
              alt="MongoDB"
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
              src="https://www.svgrepo.com/show/375433/firestore.svg"
              alt="Firestore"
              className="h-12"
            />
          </section>
        </section>
      </section>
    </section>
  );
};

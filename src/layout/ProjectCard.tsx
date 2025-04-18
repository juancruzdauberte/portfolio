import { IoIosLink } from "react-icons/io";
import { LuCodeXml } from "react-icons/lu";

type cardProyect = {
  title: string;
  codeUrl: string;
  previewUrl: string;
  description: string;
  img: string;
  technologies: React.ReactNode[];
};

export const ProjectCard = ({
  title,
  codeUrl,
  previewUrl,
  description,
  img,
  technologies,
}: cardProyect) => {
  return (
    <section className="group flex flex-col justify-center w-[280px] md:w-[300px] rounded-sm overflow-hidden shadow-lg transition hover:shadow-xl bg-white dark:bg-slate-700">
      <div className="flex justify-end bg-gray-100 w-full">
        <span className="w-20 text-sm text-center top-0 rounded-full border px-1 m-1 border-yellow-400 bg-yellow-50 text-yellow-400">
          En curso
        </span>
      </div>

      <div className="w-full">
        <img
          className="h-48 w-full object-cover"
          src={img}
          alt="Tierra de nudos"
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-5 text-center">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-sm text-justify leading-relaxed">{description}</p>

        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-black dark:border-white rounded-full py-1 px-4 text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            <LuCodeXml className="text-xl" />
            Code
          </a>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-black dark:border-white rounded-full py-1 px-4 text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            <IoIosLink className="text-xl" />
            Preview
          </a>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h6 className="text-sm font-semibold">Tecnologías utilizadas:</h6>
          <div className="flex gap-3 text-3xl">
            {technologies.map((TechIcon, index) => (
              <span key={index}>{TechIcon}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

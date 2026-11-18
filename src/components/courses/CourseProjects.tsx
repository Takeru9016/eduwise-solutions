import { Check } from "lucide-react";
import type { CourseContent } from "@/types/course";

export default function CourseProjects({ course }: { course: CourseContent }) {
  const phases = course.modules.filter((module) => module.projects?.length);
  const { capstone } = course;

  return (
    <>
      {phases.length > 0 && (
        <section>
          <h2 className="mb-6 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
            Guided Projects
          </h2>
          <div className="space-y-7">
            {phases.map((phase) => (
              <div key={phase.title}>
                <h3 className="mb-3 font-bold font-vietnam text-grey-15 text-lg">
                  {phase.title}
                </h3>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {phase.projects?.map((project) => (
                    <li
                      className="rounded-2xl border-2 border-grey-15 bg-light-97 p-5"
                      key={project._key}
                    >
                      <h4 className="font-bold text-grey-15">
                        {project.title}
                      </h4>
                      {project.description && (
                        <p className="mt-2 text-grey-40 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {capstone?.title && (
        <section className="rounded-3xl border-2 border-grey-15 bg-primary-99 p-6 sm:p-10">
          <p className="mb-2 font-bold text-grey-40 text-sm uppercase tracking-wide">
            Final Capstone
          </p>
          <h2 className="font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
            {capstone.title}
          </h2>
          {capstone.description && (
            <p className="mt-3 max-w-3xl text-grey-35 leading-relaxed">
              {capstone.description}
            </p>
          )}
          {Boolean(capstone.outcomes?.length) && (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {capstone.outcomes?.map((outcome) => (
                <li className="flex gap-2 text-grey-35" key={outcome}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}

import { motion } from 'framer-motion';
import type { CourseProgress, Skill } from '@/core/models';
import { HalftoneOverlay } from '@/components/ui/HalftoneOverlay';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Stat } from '@/core/models';

interface AboutSectionProps {
  bioParagraphs: readonly string[];
  currentSkills: readonly Skill[];
  learningSkills: readonly Skill[];
  courses: readonly CourseProgress[];
}

export function AboutSection({
  bioParagraphs,
  currentSkills,
  learningSkills,
  courses,
}: AboutSectionProps) {
  return (
    <section className="screen-panel relative h-full overflow-y-auto overflow-x-hidden bg-persona-red px-6 pt-28 pb-28 lg:px-10">
      <HalftoneOverlay className="opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-persona-black/70">03</p>
          <h2 className="font-display text-5xl tracking-wider text-persona-black md:text-6xl">
            SOBRE MÍ
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            className="space-y-5 border-4 border-persona-black bg-persona-white p-6 shadow-[8px_8px_0_#0a0a0a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed text-persona-black">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <div className="space-y-8">
            <SkillGroup title="Stack actual" skills={currentSkills} />
            <SkillGroup title="En formación" skills={learningSkills} muted />
            <CourseGroup courses={courses} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillGroupProps {
  title: string;
  skills: readonly Skill[];
  muted?: boolean;
}

function SkillGroup({ title, skills, muted = false }: SkillGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="mb-4 font-display text-2xl tracking-wider text-persona-black">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`flex items-center gap-2 border-2 border-persona-black px-3 py-2 ${
              muted ? 'bg-persona-black/10' : 'bg-persona-white'
            }`}
          >
            <img
              src={skill.icon}
              alt=""
              className="h-6 w-6 object-contain"
              loading="lazy"
            />
            <span className="text-sm font-semibold tracking-wider text-persona-black uppercase">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface CourseGroupProps {
  courses: readonly CourseProgress[];
}

function CourseGroup({ courses }: CourseGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="mb-4 font-display text-2xl tracking-wider text-persona-black">
        Cursos Udemy
      </h3>
      <div className="space-y-4 border-4 border-persona-black bg-persona-white p-5">
        {courses.map((course, index) => (
          <div key={course.name} className="flex items-center gap-4">
            <img
              src={course.icon}
              alt=""
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
            <div className="flex-1">
              <ProgressBar
                stat={new Stat(course.name, course.progress)}
                index={index}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

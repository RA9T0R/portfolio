import SkillButton from "./ui/SkillButton"
import cpp from '@/assets/cpp.png'
import python from '@/assets/python.png'
import java from '@/assets/java.png'
import js from '@/assets/js.png'
import ts from '@/assets/ts.png'

import html from '@/assets/html.png'
import css from '@/assets/css.png'
import react from '@/assets/react.png'
import next from '@/assets/next.png'
import nodejs from '@/assets/nodejs.png'
import tailwind from '@/assets/tailwind.png'

import mongo from '@/assets/mongo.png'
import mysql from '@/assets/MySQL.png'
import PostgreSQL from '@/assets/PostgreSQL.png'

import git from '@/assets/git.png'
import github from '@/assets/github.png'
import figma from '@/assets/figma.png'


const Skills = () => {
  return (
    <div className="text-xl flex flex-col justify-center text-Main dark:text-white gap-5 mb-4 p-2">
      <div className="flex flex-col gap-5">
        <p>Languages</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image={cpp} link="https://www.w3schools.com/cpp/"/>
          <SkillButton image={python} link="https://www.python.org/"/>
          <SkillButton image={java} link="https://www.java.com/en/"/>
          <SkillButton image={js} link="https://www.w3schools.com/js/"/>
          <SkillButton image={ts} link="https://www.typescriptlang.org/"/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Website</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image={html} link="https://www.w3schools.com/html/"/>
          <SkillButton image={css} link="https://www.w3schools.com/css/"/>
          <SkillButton image={react} link="https://react.dev/"/>
          <SkillButton image={next} link="https://nextjs.org/"/>
          <SkillButton image={nodejs} link="https://nodejs.org/en"/>
          <SkillButton image={tailwind} link="https://tailwindcss.com/"/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Database</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image={mongo} link="https://www.mongodb.com/"/>
          <SkillButton image={mysql} link="https://www.mysql.com/"/>
          <SkillButton image={PostgreSQL} link="https://www.postgresql.org/"/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Other</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image={git} link="https://git-scm.com/"/>
          <SkillButton image={github} link="https://github.com/"/>
          <SkillButton image={figma} link="https://www.figma.com/"/>
        </div>
      </div>
    </div>
  );
};


export default Skills

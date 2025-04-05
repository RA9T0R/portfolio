'use client'
import SkillButton from "./ui/SkillButton"
import { useTheme } from 'next-themes'

const Skills = () => {

  const {theme} = useTheme()

  return (
    <div className="text-xl md:text-2xl flex flex-col justify-center text-Main dark:text-white gap-5 mb-4 p-2">
      <div className="flex flex-col gap-5">
        <p>Languages</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image='/c.svg' link="https://www.w3schools.com/c/"/>
          <SkillButton image='/cpp.svg' link="https://www.w3schools.com/cpp/"/>
          <SkillButton image="/py.svg" link="https://www.python.org/"/>
          <SkillButton image="/java.svg" link="https://www.java.com/en/"/>
          <SkillButton image="/js.svg" link="https://www.w3schools.com/js/"/>
          <SkillButton image="/ts.svg" link="https://www.typescriptlang.org/"/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Website</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image='/html.svg' link="https://www.w3schools.com/html/"/>
          <SkillButton image='/css.svg' link="https://www.w3schools.com/css/"/>
          <SkillButton image="/tail.svg" link="https://tailwindcss.com/"/>
          <SkillButton image="/re.svg" link="https://react.dev/"/>
          {theme === 'dark' 
            ? <SkillButton image="/nextD.svg" link="https://nextjs.org/"/>
            : <SkillButton image="/next.svg" link="https://nextjs.org/"/>}
          <SkillButton image="/nodejs.svg" link="https://nodejs.org/en"/>
          {theme === 'dark' 
            ? <SkillButton image="/express.svg" link="https://expressjs.com/"/>
            : <SkillButton image="/expressW.svg" link="https://expressjs.com/"/>}
          {theme === 'dark' 
            ? <SkillButton image="/socket.svg" link="https://socket.io/"/>
            : <SkillButton image="/socketW.svg" link="https://socket.io/"/>}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Database</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image='/mongo.svg' link="https://www.mongodb.com/"/>
          <SkillButton image='/mysql.svg' link="https://www.mysql.com/"/>
          <SkillButton image='/postgreSQL.svg' link="https://www.postgresql.org/"/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p>Other</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <SkillButton image='/git.svg' link="https://git-scm.com/"/>
          {theme === 'dark' 
            ? <SkillButton image="/githubD.svg" link="https://github.com/"/>
            : <SkillButton image="/github.svg" link="https://github.com/"/>}
          <SkillButton image='/figma.svg' link="https://www.figma.com/"/>
          <SkillButton image='/pho.svg' link="https://www.adobe.com/th_th/creativecloud/business/teams/photoshop.html"/>
        </div>
      </div>
    </div>
  );
};


export default Skills

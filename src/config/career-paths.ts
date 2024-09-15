export interface Skill {
  name: string;
  logo: string; // Change this to string, not StaticImageData
}


export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface CareerPath {
  name: string;
  skills: {
    [key: string]: Skill[];
  };
}

export const careerPaths: Record<string, CareerPath> = {
  frontend: {
    name: 'Frontend Developer',
    skills: {
      '1': [
        { name: 'HTML', logo: '/images/logos/html.png' },
        { name: 'CSS', logo: '/images/logos/css.png' },
        {name: 'JavaScript', logo: '/images/logos/javascript.svg'},
        {name: 'Git / GitHub', logo: '/images/logos/gitforwindows.svg'},

      ],
      '2': [
        { name: 'JavaScript', logo: '/images/logos/js.png' },
        { name: 'React Basics', logo: '/images/logos/react.png' },
      ],
      '3': [
        { name: 'Advanced React', logo: '/images/logos/react.png' },
        { name: 'TypeScript', logo: '/images/logos/typescript.png' },
      ],
    },
  },
  // ... add more career paths
};

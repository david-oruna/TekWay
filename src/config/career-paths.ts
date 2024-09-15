export interface Skill {
  name: string;
  logo: string; 
}


export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface CareerPath {
  name: string;
  levels: {
    [key: string]: SkillCategory[];
  };
}

export const careerPaths: Record<string, CareerPath> = {
  frontend: {
    name: 'Frontend Developer',
    levels: {
      '1': [
        {
          name:'Basics', 

        skills: [
        { name: 'HTML', logo: '/images/logos/html.png' },
        { name: 'CSS', logo: '/images/logos/css.png' },
        {name: 'JavaScript', logo: '/images/logos/javascript.svg'},
        {name: 'Git / GitHub', logo: '/images/logos/gitforwindows.svg'},
        ]
      },
      ],

    },
  },
  // ... add more career paths
};

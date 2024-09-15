export interface Skill {
  name: string;
  logobw: string;
  logocolor: string;
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
        { name: 'HTML', logobw: '/images/logos/bw/html5.svg', logocolor: '/images/logos/color/html5-color.svg' },
        { name: 'CSS', logobw: '/images/logos/bw/css3.svg', logocolor: '/images/logos/color/css3-color.svg' },
        {name: 'JavaScript', logobw: '/images/logos/bw/javascript.svg', logocolor: '/images/logos/color/javascript-color.svg'},
        
        ]
      },
    {
          name:'Version Control System', 

        skills: [
        { name: 'Git / GitHub', logobw: '/images/logos/bw/gitforwindows.svg', logocolor: '/images/logos/color/gitforwindows-color.svg'},
        
        ]
      }
      ],
      '2': [
        {
          name:'Frameworks & Libraries', 

        skills: [
        { name: 'React', logobw: '/images/logos/bw/react.svg', logocolor: '/images/logos/color/react-color.svg' },
        { name: 'Next.js', logobw: '/images/logos/bw/nextdotjs.svg', logocolor: '/images/logos/color/nextdotjs-color.svg' },
        { name: 'Tailwind CSS', logobw: '/images/logos/bw/tailwindcss.svg', logocolor: '/images/logos/color/tailwindcss-color.svg' },
     
        ]}
      ]
    }},
    datascience: {
    name: 'Data Scientist',
    levels: {
      '1': [
        {
          name:'Basics', 

        skills: [
        { name: 'Python', logobw: '/images/logos/bw/python.svg', logocolor: '/images/logos/color/python-color.svg' },
        { name: 'Pandas', logobw: '/images/logos/bw/pandas.svg', logocolor: '/images/logos/color/pandas-color.svg' },
        { name: 'NumPy', logobw: '/images/logos/bw/numpy.svg', logocolor: '/images/logos/color/numpy-color.svg' },
        ]
      }
    ],


    '2': [
      {
        name:'Machine Learning', 

        skills: [
        { name: 'Scikit-learn', logobw: '/images/logos/bw/scikitlearn.svg', logocolor: '/images/logos/color/scikitlearn-color.svg' },
        { name: 'TensorFlow', logobw: '/images/logos/bw/tensorflow.svg', logocolor: '/images/logos/color/tensorflow-color.svg' },
        ]
      }
    ]

  }
}
}


